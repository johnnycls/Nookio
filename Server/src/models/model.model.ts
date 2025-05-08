import mongoose, { Schema, Document } from "mongoose";

export interface IModel extends Document {
  name: string;
  systemInstruction: string;
  greetingPrompt: string;
  gender: string;
  dob: Date;
  temperature: number;
}

const ModelSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    systemInstruction: { type: String, required: true },
    greetingPrompt: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    temperature: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IModel>("Model", ModelSchema);
