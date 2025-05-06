import express from "express";
import { Router } from "express";
import type { Request, Response } from "express";
import Chatroom from "../models/chatroom.model";
import User from "../models/user.model";
import Friend, { IFriend } from "../models/friend.model";
import authMiddleware from "../middlewares/auth";

const router: Router = express.Router();

// Get chat list for the authenticated user
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const email = res.locals.email as string;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const chatrooms = await Chatroom.find({ _id: { $in: user.chatrooms } })
      .populate<{ friendId: IFriend }>(
        "friendId",
        "name description gender dob"
      )
      .sort({ updatedAt: -1 });

    const chatList = chatrooms.map((chatroom) => ({
      _id: chatroom._id,
      friend: {
        _id: chatroom.friendId._id,
        name: chatroom.friendId.name,
        description: chatroom.friendId.description || "",
        gender: chatroom.friendId.gender || "",
        dob: chatroom.friendId.dob || null,
      },
      lastMessage: chatroom.chats[chatroom.chats.length - 1] || null,
      lastRead: chatroom.lastRead,
      unreadCount: chatroom.chats.length - chatroom.lastRead - 1,
      updatedAt: chatroom.updatedAt,
    }));

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
      if (!user.chatrooms.includes(chatroomId as any)) {
        return res.status(404).json({ message: "Chatroom not found" });
      }

      const chatroom = await Chatroom.findById(chatroomId).populate(
        "friendId",
        "name description"
      );

      if (!chatroom) {
        return res.status(404).json({ message: "Chatroom not found" });
      }

      // Update lastRead to the latest message
      chatroom.lastRead = chatroom.chats.length - 1;
      await chatroom.save();

      return res.status(200).json({
        _id: chatroom._id,
        friendId: chatroom.friendId,
        chats: chatroom.chats,
        lastRead: chatroom.lastRead,
        updatedAt: chatroom.updatedAt,
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
      if (!user.chatrooms.includes(chatroomId as any)) {
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

// Update chatroom lastRead position
router.patch(
  "/:chatroomId/read",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const email = res.locals.email as string;
      const { chatroomId } = req.params;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.chatrooms.includes(chatroomId as any)) {
        return res.status(404).json({ message: "Chatroom not found" });
      }

      const chatroom = await Chatroom.findById(chatroomId);

      if (!chatroom) {
        return res.status(404).json({ message: "Chatroom not found" });
      }

      if (chatroom.lastRead === chatroom.chats.length - 1) {
        return res.status(200).json({
          lastRead: chatroom.lastRead,
        });
      }

      chatroom.lastRead = chatroom.chats.length - 1;
      await chatroom.save();

      return res.status(200).json({
        lastRead: chatroom.lastRead,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
