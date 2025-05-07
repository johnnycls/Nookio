import User, { IUser } from "../models/user.model";
import Chatroom, { IChatroom } from "../models/chatroom.model";
import Friend from "../models/friend.model";
import { generateGreeting } from "./gemini.service";

export async function handleCreateRequest(user: IUser, chatroomNum: number) {
  // Find friends without chatrooms
  let userChatrooms = await Chatroom.find({
    id: { $in: user.chatrooms },
  });
  const existingChatroomFriendIds = userChatrooms.map(
    (chatroom: IChatroom) => chatroom.friendId
  );

  const availableFriends = await Friend.aggregate([
    { $match: { _id: { $nin: existingChatroomFriendIds } } },
    { $sample: { size: chatroomNum } },
  ]);

  if (!availableFriends || availableFriends.length < chatroomNum) {
    throw new Error("No available friends found");
  }

  const initialMessages = await Promise.all(
    availableFriends.map(async (friend) => {
      return await generateGreeting(user, friend);
    })
  );

  // Create chatroom
  const chatrooms = await Chatroom.create(
    availableFriends.map((friend, index) => ({
      userId: user._id,
      friendId: friend._id,
      messages: [
        {
          content: initialMessages[index],
          sender: "model",
          timestamp: new Date(),
        },
      ],
    }))
  );
  await Promise.all(chatrooms.map(async (chatroom) => await chatroom.save()));

  // Add chatroom to user's list
  await User.findByIdAndUpdate(user._id, {
    $push: { chatrooms: { $each: chatrooms.map((chatroom) => chatroom._id) } },
  });
}
