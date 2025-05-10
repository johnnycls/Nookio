import User, { IUser } from "../models/user.model";
import Chatroom, { IChatroom } from "../models/chatroom.model";
import { generateGreeting } from "./gemini.service";
import models from "../assets/models/models";

export async function handleCreateRequest(user: IUser, chatroomNum: number) {
  try {
    let userChatrooms = await Chatroom.find({
      _id: { $in: user.chatrooms },
    });

    const existingChatroomModelIds = userChatrooms.map(
      (chatroom: IChatroom) => chatroom.modelId
    );

    const availableModelIds = Object.keys(models).filter((modelId) => {
      const model = models[modelId];
      return (
        !existingChatroomModelIds.includes(modelId) &&
        (user.preferedGender === "both" || model.gender === user.preferedGender)
      );
    });

    if (availableModelIds.length < chatroomNum) {
      throw new Error("No available friends found");
    }

    const selectedModelIds = getRandomSubarray(availableModelIds, chatroomNum);

    console.log(selectedModelIds);

    const chatrooms = await Promise.all(
      selectedModelIds.map(async (modelId) => {
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

        return chatroom;
      })
    );

    // Add chatroom to user's list
    await User.findByIdAndUpdate(user._id, {
      $push: {
        chatrooms: {
          $each: chatrooms.map((chatroom) => chatroom._id),
        },
      },
    });
  } catch (error) {
    console.error("Error creating chatrooms:", JSON.stringify(error));
    throw new Error("Error creating chatrooms:" + JSON.stringify(error));
  }
}
