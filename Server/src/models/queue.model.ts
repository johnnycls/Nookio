import mongoose, { Schema, Document } from "mongoose";

export type RequestType = "create" | "respond";

export interface IQueueItem extends Document {
  userId: mongoose.Types.ObjectId;
  chatroomId?: mongoose.Types.ObjectId;
  type: RequestType;
  creditUse: number;
  status: "pending" | "processing" | "completed" | "failed";
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QueueSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    chatroomId: { type: Schema.Types.ObjectId, ref: "Chatroom" },
    type: {
      type: String,
      enum: ["create", "respond"],
      required: true,
    },
    creditUse: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    error: { type: String },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queue processing
QueueSchema.index({ status: 1, createdAt: 1 }); // For processing queue in order
QueueSchema.index({ userId: 1, status: 1 }); // For getting user's queue status

export default mongoose.model<IQueueItem>("Queue", QueueSchema);
