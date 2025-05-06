import mongoose, { Schema, Document } from "mongoose";
import { MAX_CHATROOMS, MIN_CREDITS_FOR_AUTO_CHAT } from "../config";
import Queue from "./queue.model";

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
  isPublic: boolean;
  checkAndCreateChatroomRequests(): Promise<void>;
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
    isPublic: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Method to check conditions and create chatroom requests
userSchema.methods.checkAndCreateChatroomRequests =
  async function (): Promise<void> {
    // Only proceed if user is public
    if (!this.isPublic) {
      return;
    }

    // Calculate how many more chatrooms can be created based on slots
    const currentChatrooms = this.chatrooms.length;
    const availableSlots = MAX_CHATROOMS - currentChatrooms;

    // Calculate how many chatrooms can be created based on credits
    const availableCredits = Math.floor(
      this.credit / MIN_CREDITS_FOR_AUTO_CHAT
    );

    // Use the smaller of available slots or credit-based chatrooms
    const chatroomsToCreate = Math.min(availableSlots, availableCredits);

    if (chatroomsToCreate <= 0) {
      return;
    }

    this.credit -= chatroomsToCreate * MIN_CREDITS_FOR_AUTO_CHAT;
    for (let i = 0; i < chatroomsToCreate; i++) {
      await Queue.create({
        userId: this._id,
        type: "create",
        creditUse: MIN_CREDITS_FOR_AUTO_CHAT,
      });
    }

    await this.save();
  };

// Pre-save middleware to check conditions when isPublic changes
userSchema.pre("save", async function (this: IUser, next) {
  if (this.isModified("isPublic") && this.isPublic) {
    await this.checkAndCreateChatroomRequests();
  }
  next();
});

// Post-remove middleware for chatrooms
userSchema.post("findOneAndUpdate", async function (doc: IUser) {
  if (doc && doc.isModified("chatrooms")) {
    await doc.checkAndCreateChatroomRequests();
  }
});

export default mongoose.model<IUser>("User", userSchema);
