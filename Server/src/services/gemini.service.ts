import { GoogleGenAI } from "@google/genai";
import {
  GEMINI_API_KEY,
  MAX_OUTPUT_TOKENS,
  SUMMARY_TEMPERATURE,
  SUMMARY_MSG,
} from "../config";
import { IUser } from "../models/user.model";
import { IChatroom, IMessage } from "../models/chatroom.model";
import {
  summarizePrompt,
  summarizeSystemInstruction,
} from "../utils/summarize";
import Model from "../../assets/models/model";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY || "" });

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

const convertToChatMessage = (message: IMessage): ChatMessage => ({
  role: message.sender === "user" ? "user" : "model",
  parts: [{ text: message.content }],
});

const generateSystemInstruction = (
  user: IUser,
  model: Model,
  summaries: string[]
): string => {
  return model.systemInstruction({
    username: user.name,
    userGender: user.gender || "",
    userDescription: user.description || "",
    userDob: user.dob || new Date(),
    userLang: user.lang || "",
    summaries: summaries,
  });
};

const generateGreetingPrompt = (user: IUser, model: Model): string => {
  return model.greetingPrompt({
    username: user.name,
  });
};

export const generateSummary = async (
  messages: IMessage[],
  user: IUser,
  model: Model
): Promise<string> => {
  try {
    const historyChat = messages
      .map(
        (msg) =>
          `${msg.sender === "user" ? user.name : model.name}: ${msg.content}`
      )
      .join("\n");

    const systemInstruction = summarizeSystemInstruction({
      username: user.name,
      modelName: model.name,
      historyChat: historyChat,
    });

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: summarizePrompt,
      config: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: SUMMARY_TEMPERATURE,
        systemInstruction,
      },
    });

    return result.text || "";
  } catch (error) {
    console.error("Error summarizing conversation:", error);
    return "";
  }
};

export const generateResponse = async (
  user: IUser,
  model: Model,
  message: string,
  chatroom: IChatroom
): Promise<string> => {
  try {
    const historyMessage = chatroom.messages
      .slice(-SUMMARY_MSG)
      .map(convertToChatMessage);

    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: historyMessage,
      config: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: model.temperature,
        systemInstruction: generateSystemInstruction(
          user,
          model,
          chatroom.summaries
        ),
      },
    });

    const result = await chat.sendMessage({
      message: message,
    });
    return result.text || "";
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Failed to generate response");
  }
};

export const generateGreeting = async (
  user: IUser,
  model: Model
): Promise<string> => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: generateGreetingPrompt(user, model),
      config: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: model.temperature,
        systemInstruction: generateSystemInstruction(user, model, []),
      },
    });

    return result.text || "";
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Failed to generate response");
  }
};
