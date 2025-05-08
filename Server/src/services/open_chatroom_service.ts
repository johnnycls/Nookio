import User, { IUser } from "../models/user.model";
import Chatroom, { IChatroom } from "../models/chatroom.model";
import Model from "../models/model.model";
import { generateGreeting } from "./gemini.service";

export async function handleCreateRequest(user: IUser, chatroomNum: number) {
  // Find friends without chatrooms
  let userChatrooms = await Chatroom.find({
    id: { $in: user.chatrooms },
  });
  const existingChatroomModelIds = userChatrooms.map(
    (chatroom: IChatroom) => chatroom.modelId
  );

  const availableModels = await Model.aggregate([
    { $match: { _id: { $nin: existingChatroomModelIds } } },
    {
      $match: {
        $or: [{ gender: user.preferedGender }, { gender: "both" }],
      },
    },
    { $sample: { size: chatroomNum } },
  ]);
  if (!availableModels || availableModels.length < chatroomNum) {
    throw new Error("No available friends found");
  }

  const chatrooms = await Promise.all(
    availableModels.map(async (model) => {
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
    $push: { chatrooms: { $each: chatrooms.map((chatroom) => chatroom._id) } },
  });
}
