import mongoose, { Schema, Document } from "mongoose";

export interface IMessage {
  content: string;
  sender: "user" | "model";
  timestamp: Date;
}

export interface IChatroom extends Document {
  userId: Schema.Types.ObjectId;
  modelId: string;
  messages: IMessage[];
  summaries: string[];
  lastSummaryPosition: number;
}

const messageSchema = new Schema({
  content: { type: String, required: true },
  sender: { type: String, enum: ["user", "model"], required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatroomSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    modelId: { type: String, required: true },
    messages: [messageSchema],
    summaries: { type: [String], default: [] },
    lastSummaryPosition: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IChatroom>("Chatroom", chatroomSchema);
