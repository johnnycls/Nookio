import express from "express";
import authMiddleware from "../middlewares/auth";
import User from "../models/user.model";
import Chatroom from "../models/chatroom.model";
import Queue from "../models/queue.model";
import { CREDITS_FOR_RESPONSE, MAX_INPUT_TOKENS } from "../config";
import { calculateTokens } from "../utils/token";

const router = express.Router();

// Send message to chatroom
router.post("/:chatroomId", authMiddleware, async (req, res) => {
  try {
    const { chatroomId } = req.params;
    const { message } = req.body;
    const email = res.locals.email;

    const messageTokens = calculateTokens(message);
    if (messageTokens > MAX_INPUT_TOKENS) {
      return res.status(400).json({ message: "Message too long" });
    }

    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return res.status(400).json({ message: "Invalid message" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find chatroom and verify ownership
    const chatroom = await Chatroom.findOne({
      _id: chatroomId,
      userId: user._id,
    });

    if (!chatroom) {
      return res.status(404).json({ message: "Chatroom not found" });
    }

    // Calculate required credits based on message tokens
    const requiredCredits = CREDITS_FOR_RESPONSE(chatroom.messages.length);

    if (user.credit < requiredCredits) {
      return res.status(400).json({
        message: "Insufficient credits",
        requiredCredits,
        currentCredits: user.credit,
        messageTokens,
      });
    }

    // Deduct credits and create queue item
    user.credit -= requiredCredits;
    await user.save();

    const queueItem = await Queue.create({
      userId: user._id,
      chatroomId: chatroomId,
      type: "response",
      creditUse: requiredCredits,
      status: "pending",
    });

    // Add message to chatroom
    chatroom.messages.push({
      content: message,
      sender: "user",
      timestamp: new Date(),
    });
    await chatroom.save();

    res.status(200).json({
      message: "Message sent and queued for response",
      queueId: queueItem._id,
      remainingCredits: user.credit,
      creditUse: requiredCredits,
      messageTokens,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Error sending message" });
  }
});

export default router;
