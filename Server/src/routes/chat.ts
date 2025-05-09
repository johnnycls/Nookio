import express from "express";
import authMiddleware from "../middlewares/auth";
import User from "../models/user.model";
import Chatroom from "../models/chatroom.model";
import { CREDITS_FOR_RESPONSE, MAX_INPUT_TOKENS, SUMMARY_MSG } from "../config";
import { calculateTokens } from "../utils/token";
import { generateResponse, generateSummary } from "../services/gemini.service";
import models from "../assets/models/models";

const router = express.Router();

// Send message to chatroom
router.post("/:chatroomId", authMiddleware, async (req, res) => {
  try {
    const { chatroomId } = req.params;
    const { message } = req.body;
    const email = res.locals.email;

    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return res.status(400).json({ message: "Invalid message" });
    }

    const messageTokens = calculateTokens(message);
    if (messageTokens > MAX_INPUT_TOKENS) {
      return res.status(400).json({ message: "Message too long" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.chatrooms.map((id) => id.toString()).includes(chatroomId)) {
      return res.status(400).json({ message: "Chatroom not found" });
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
      });
    }

    if (!(chatroom.modelId in models)) {
      return res.status(404).json({ message: "Model not found" });
    }

    const model = models[chatroom.modelId];

    // If we have enough messages to trigger summarization
    if (chatroom.messages.length > chatroom.lastSummaryPosition + SUMMARY_MSG) {
      const messagesToSummarize = chatroom.messages.slice(
        chatroom.lastSummaryPosition,
        chatroom.lastSummaryPosition + SUMMARY_MSG
      );

      // Generate new summary
      const newSummary = await generateSummary(
        messagesToSummarize,
        user,
        model
      );

      chatroom.summaries.push(newSummary);
      chatroom.lastSummaryPosition += SUMMARY_MSG;
    }

    const response = await generateResponse(user, model, message, chatroom);

    chatroom.messages.push({
      content: message,
      sender: "user",
      timestamp: new Date(),
    });

    chatroom.messages.push({
      content: response,
      sender: "model",
      timestamp: new Date(),
    });
    chatroom.lastReadPosition = chatroom.messages.length - 1;
    await chatroom.save();

    user.credit -= requiredCredits;
    await user.save();

    res.status(200).json({
      message: message,
      response: response,
      lastReadPosition: chatroom.lastReadPosition,
      remainingCredits: user.credit,
    });
  } catch (error) {
    console.error("Error sending message:", JSON.stringify(error));
    res.status(500).json({ message: "Error sending message" });
  }
});

export default router;
