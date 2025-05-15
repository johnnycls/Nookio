import User, { IUser } from "../models/user.model";
import Chatroom from "../models/chatroom.model";
import { generateGreeting } from "./gemini.service";
import models from "../assets/models/models";
import { MAX_CHATROOMS } from "../config";

export async function handleCreateRequest(user: IUser, modelId: string) {
  try {
    if (!models.hasOwnProperty(modelId)) {
      throw new Error("Invalid model ID");
    }

    if (user.chatrooms.length >= MAX_CHATROOMS) {
      throw new Error("Max chatrooms reached");
    }

    const model = models[modelId];

    const greeting = await generateGreeting(user, model);

    const chatroom = await Chatroom.create({
      userId: user._id,
      modelId: model._id,
      messages: [
        {
          content: greeting,
          sender: "model",
          timestamp: new Date(),
        },
      ],
    });

    await chatroom.save();

    // Add chatroom to user's list
    await User.findByIdAndUpdate(user._id, {
      $push: {
        chatrooms: chatroom._id,
      },
    });
  } catch (error) {
    console.error("Error creating chatrooms:", JSON.stringify(error));
    throw new Error("Error creating chatrooms:" + JSON.stringify(error));
  }
}
