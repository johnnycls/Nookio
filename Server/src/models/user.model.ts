import mongoose, { Schema, Document } from "mongoose";
import { MAX_CHATROOMS, MIN_CREDITS_FOR_AUTO_CHAT } from "../config";

export interface IUser extends Document {
  email: string;
  name: string;
  description?: string;
  gender?: string;
  dob?: Date;
  credit: number;
  lang: string;
  lastTokenTime?: Date;
  chatrooms: Schema.Types.ObjectId[];
  targetChatrooms: number;
}

const userSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    gender: { type: String, default: "" },
    dob: { type: Date, default: null },
    credit: { type: Number, default: 0 },
    lang: { type: String, default: "en" },
    lastTokenTime: { type: Date },
    chatrooms: { type: [Schema.Types.ObjectId], default: [] },
    targetChatrooms: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
