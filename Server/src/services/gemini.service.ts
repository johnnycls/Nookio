import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY, MAX_OUTPUT_TOKENS, TEMPERATURE } from "../config";
import { IFriend } from "../models/friend.model";
import { IUser } from "../models/user.model";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY || "" });

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

const generateSystemInstruction = (user: IUser, friend: IFriend): string => {
  return `You are ${friend.name}, a ${friend.gender || "person"} born on ${
    friend.dob || "unknown date"
  }. ${friend.description || ""} You are talking to ${user.name}, who is ${
    user.description || "a user"
  } and speaks ${user.lang}. Respond in ${user.lang}.`;
};

export const generateGreeting = async (
  user: IUser,
  friend: IFriend
): Promise<string> => {
  try {
    const prompt = `Generate a friendly greeting message as ${friend.name}. The message should be casual and engaging.`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: TEMPERATURE,
        systemInstruction: generateSystemInstruction(user, friend),
      },
    });

    return result.text || "";
  } catch (error) {
    console.error("Error generating greeting:", error);
    throw new Error("Failed to generate greeting");
  }
};

export const generateResponse = async (
  user: IUser,
  friend: IFriend,
  message: string,
  chatHistory?: ChatMessage[]
): Promise<string> => {
  try {
    if (chatHistory && chatHistory.length > 0) {
      const chat = ai.chats.create({
        model: "gemini-2.0-flash",
        history: chatHistory,
        config: {
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          temperature: TEMPERATURE,
          systemInstruction: generateSystemInstruction(user, friend),
        },
      });

      const result = await chat.sendMessage({
        message: message,
      });
      return result.text || "";
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
      config: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: TEMPERATURE,
        systemInstruction: generateSystemInstruction(user, friend),
      },
    });

    return result.text || "";
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Failed to generate response");
  }
};
