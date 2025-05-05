import mongoose, { Schema, Document } from "mongoose";

export interface IFriend extends Document {
  name: string;
  description?: string;
  gender?: string;
  dob?: Date;
}

const FriendSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    gender: { type: String },
    dob: { type: Date },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IFriend>("Friend", FriendSchema);
