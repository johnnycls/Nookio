import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  description?: string;
  gender?: string;
  dob?: Date;
  credit: number;
  lang: string;
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
    credit: { type: Number, default: 1000 },
    lang: { type: String, default: "en" },
    chatrooms: { type: [Schema.Types.ObjectId], default: [] },
    targetChatrooms: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
