import mongoose, { Schema, Document } from "mongoose";

interface IChat {
  from: string;
  time: Date;
  content: string;
}

export interface IChatroom extends Document {
  friendId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  lastSeen: Date;
  chats: IChat[];
}

const ChatSchema: Schema = new Schema({
  from: { type: String, required: true },
  time: { type: Date, default: Date.now },
  content: { type: String, required: true },
});

const ChatroomSchema: Schema = new Schema(
  {
    friendId: { type: Schema.Types.ObjectId, ref: "Friend", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
    lastSeen: { type: Date, default: Date.now },
    chats: [ChatSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IChatroom>("Chatroom", ChatroomSchema);
