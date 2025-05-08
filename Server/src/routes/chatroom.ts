import express from "express";
import { Router } from "express";
import type { Request, Response } from "express";
import Chatroom from "../models/chatroom.model";
import User from "../models/user.model";
import authMiddleware from "../middlewares/auth";
import models from "../../assets/models/models";

const router: Router = express.Router();

// Get chat list for the authenticated user
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const email = res.locals.email as string;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const chatrooms = await Chatroom.find({
      _id: { $in: user.chatrooms },
    });

    const chatList = chatrooms.map((chatroom) => {
      const model = models[chatroom.modelId];
      ({
        _id: chatroom._id,
        model: {
          _id: model._id,
          name: model.name,
          gender: model.gender || "",
          dob: model.dob || null,
        },
        lastMessage: chatroom.messages[chatroom.messages.length - 1] || null,
        lastReadPosition: chatroom.lastReadPosition,
      });
    });

    return res.status(200).json(chatList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get chat details for a specific chatroom
router.get(
  "/:chatroomId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const email = res.locals.email as string;
      const { chatroomId } = req.params;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the chatroom is in user's chatrooms
      if (!user.chatrooms.some((id) => id.toString() === chatroomId)) {
        return res.status(404).json({ message: "Chatroom not found" });
      }

      const chatroom = await Chatroom.findById(chatroomId);

      if (!chatroom) {
        return res.status(404).json({ message: "Chatroom not found" });
      }

      // Update lastReadPosition to the latest message
      if (chatroom.lastReadPosition < chatroom.messages.length - 1) {
        chatroom.lastReadPosition = chatroom.messages.length - 1;
        await chatroom.save();
      }

      return res.status(200).json({
        _id: chatroom._id,
        messages: chatroom.messages,
        lastReadPosition: chatroom.lastReadPosition,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Remove chatroom from user's chatrooms
router.delete(
  "/:chatroomId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const email = res.locals.email as string;
      const { chatroomId } = req.params;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the chatroom is in user's chatrooms
      if (!user.chatrooms.some((id) => id.toString() === chatroomId)) {
        return res.status(404).json({ message: "Chatroom not found" });
      }

      // Remove chatroom from user's chatrooms array
      user.chatrooms = user.chatrooms.filter(
        (id) => id.toString() !== chatroomId
      );
      await user.save();

      return res.status(200).json({ message: "Chatroom removed successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
