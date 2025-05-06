import Queue from "../models/queue.model";
import User from "../models/user.model";
import Chatroom from "../models/chatroom.model";
import Friend from "../models/friend.model";
import { generateGreeting, generateResponse } from "./gemini.service";
import { Document, Types } from "mongoose";

interface IQueueItem extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  chatroomId?: Types.ObjectId;
  type: "create" | "response";
  creditUse: number;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
}

class QueueService {
  private isProcessing: boolean = false;

  async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      // Get oldest pending item
      const queueItem = await Queue.findOne({ status: "pending" })
        .sort({ createdAt: 1 })
        .populate("userId", "credit");

      if (!queueItem) {
        this.isProcessing = false;
        return;
      }

      try {
        if (queueItem.type === "create") {
          await this.handleCreateRequest(queueItem as unknown as IQueueItem);
        } else if (queueItem.type === "response") {
          await this.handleResponseRequest(queueItem as unknown as IQueueItem);
        }

        // Mark as completed
        queueItem.status = "completed";
        await queueItem.save();
      } catch (error) {
        console.error("Error processing queue item:", error);

        // Mark as failed and refund credits
        queueItem.status = "failed";
        await queueItem.save();

        // Refund credits
        await User.findByIdAndUpdate(queueItem.userId, {
          $inc: { credit: queueItem.creditUse },
        });
      }
    } catch (error) {
      console.error("Error in queue processing:", error);
    } finally {
      this.isProcessing = false;
    }
  }

  private async handleCreateRequest(queueItem: IQueueItem) {
    const user = await User.findById(queueItem.userId);
    if (!user) throw new Error("User not found");

    // Find friends without chatrooms
    const existingChatroomFriendIds = await Chatroom.find({
      userId: user._id,
    }).distinct("friendId");

    const availableFriend = await Friend.findOne({
      _id: { $nin: existingChatroomFriendIds },
    });

    if (!availableFriend) {
      throw new Error("No available friends found");
    }

    // Create chatroom
    const chatroom = await Chatroom.create({
      userId: user._id,
      friendId: availableFriend._id,
      messages: [],
    });

    // Generate initial message
    const initialMessage = await generateGreeting(user, availableFriend);

    // Add message to chatroom
    chatroom.messages.push({
      content: initialMessage,
      sender: "friend",
      timestamp: new Date(),
    });
    await chatroom.save();

    // Add chatroom to user's list
    await User.findByIdAndUpdate(user._id, {
      $push: { chatrooms: chatroom._id },
    });
  }

  private async handleResponseRequest(queueItem: IQueueItem) {
    const user = await User.findById(queueItem.userId);
    if (!user) throw new Error("User not found");

    if (!queueItem.chatroomId) {
      throw new Error("Chatroom ID is required for response request");
    }

    const chatroom = await Chatroom.findById(queueItem.chatroomId);

    if (!chatroom) throw new Error("Chatroom not found");

    const friend = await Friend.findById(chatroom.friendId);
    if (!friend) throw new Error("Friend not found");

    // Get the last user message
    const lastUserMessage = chatroom.messages[chatroom.messages.length - 1];

    if (!lastUserMessage) {
      throw new Error("No user message found");
    }

    // Generate response
    const response = await generateResponse(
      user,
      friend,
      lastUserMessage.content,
      chatroom
    );

    // Add response to chatroom
    chatroom.messages.push({
      content: response,
      sender: "friend",
      timestamp: new Date(),
    });
    await chatroom.save();
  }

  // Start queue processing
  startProcessing() {
    // Process queue every 5 seconds
    setInterval(() => this.processQueue(), 5000);
  }
}

export const queueService = new QueueService();
