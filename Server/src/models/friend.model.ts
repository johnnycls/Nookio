import mongoose, { Schema, Document } from "mongoose";

export interface IFriend extends Document {
  name: string;
  description: string;
  gender: string;
  dob: Date;
  temperature: number;
}

const FriendSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    temperature: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IFriend>("Friend", FriendSchema);
