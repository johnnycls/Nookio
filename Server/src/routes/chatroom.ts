import express from "express";
import { Router } from "express";
import type { Request, Response } from "express";
import Chatroom from "../models/chatroom.model";
import User from "../models/user.model";
import authMiddleware from "../middlewares/auth";
import models from "../assets/models/models";
import { MIN_CREDITS_FOR_AUTO_CHAT } from "../config";
import { handleCreateRequest } from "../services/open_chatroom_service";

const router: Router = express.Router();

// Get chat list for the authenticated user
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const email = res.locals.email as string;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const chatrooms = await Chatroom.find({
      _id: { $in: user.chatrooms },
    });

    const chatList = chatrooms.map((chatroom) => {
      const model = models[chatroom.modelId];
      return {
        _id: chatroom._id,
        model: {
          _id: model._id,
          name: model.name,
          gender: model.gender || "",
          dob: model.dob || null,
          avatar: model.avatar || "",
        },
        lastMessage: chatroom.messages[chatroom.messages.length - 1] || null,
      };
    });

    res.status(200).json(chatList);
  } catch (error) {
    console.error(JSON.stringify(error));
    res
      .status(500)
      .json({ message: "Internal server error", error: JSON.stringify(error) });
  }
});

// Get chat details for a specific chatroom
router.get(
  "/:chatroomid",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const email = res.locals.email as string;
      const { chatroomid } = req.params;
      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Check if the chatroom is in user's chatrooms
      if (!user.chatrooms.some((id) => id.toString() === chatroomid)) {
        res.status(404).json({ message: "Chatroom not found" });
        return;
      }

      const chatroom = await Chatroom.findById(chatroomid);

      if (!chatroom) {
        res.status(404).json({ message: "Chatroom not found" });
        return;
      }

      if (!chatroom.modelId) {
        res.status(404).json({ message: "Model not found" });
        return;
      }
      const model = models[chatroom.modelId];

      res.status(200).json({
        _id: chatroom._id,
        messages: chatroom.messages,
        model: {
          _id: model._id,
          name: model.name,
          gender: model.gender || "",
          dob: model.dob || null,
          avatar: model.avatar || "",
        },
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      res.status(500).json({
        message: "Internal server error",
        error: JSON.stringify(error),
      });
    }
  }
);

// Remove chatroom from user's chatrooms
router.delete("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const email = res.locals.email as string;
    const { chatroomIds } = req.body as { chatroomIds: string[] };
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check if the chatroom is in user's chatrooms
    const userChatroomIds = user.chatrooms.map((id) => id.toString());
    if (chatroomIds.some((id) => !userChatroomIds.includes(id))) {
      res.status(404).json({ message: "Chatroom not found" });
      return;
    }

    // Remove chatroom from user's chatrooms array
    user.chatrooms = user.chatrooms.filter(
      (id) => !chatroomIds.includes(id.toString())
    );

    await user.save();

    // Delete chatrooms with less than 5 messages
    await Chatroom.deleteMany({
      _id: { $in: chatroomIds },
      $expr: { $lt: [{ $size: "$messages" }, 5] },
    });

    res.status(200).json({ message: "Chatroom removed successfully" });
  } catch (error) {
    console.error(JSON.stringify(error));
    res
      .status(500)
      .json({ message: "Internal server error", error: JSON.stringify(error) });
  }
});

// Create new chatroom
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { modelId } = req.body as { modelId: string };
    const user = await User.findOne({ email: res.locals.email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (user.credit < MIN_CREDITS_FOR_AUTO_CHAT) {
      res.status(400).json({ message: "Insufficient credits" });
      return;
    }

    await handleCreateRequest(user, modelId);
    user.credit -= MIN_CREDITS_FOR_AUTO_CHAT;
    await user.save();

    res.status(200).json({
      message: "Chatroom created successfully",
    });
  } catch (error) {
    console.error("Error sending message:", JSON.stringify(error));
    res.status(500).json({
      message: "Error sending message",
      error: JSON.stringify(error),
    });
  }
});

export default router;
