import { GoogleGenAI } from "@google/genai";
import {
  GEMINI_API_KEY,
  MAX_OUTPUT_TOKENS,
  SUMMARY_TEMPERATURE,
  SUMMARY_MSG,
  LLM_MODEL,
} from "../config";
import { IUser } from "../models/user.model";
import { IChatroom, IMessage } from "../models/chatroom.model";
import {
  summarizePrompt,
  summarizeSystemInstruction,
} from "../utils/summarize";
import Model from "../assets/models/model";
import { langs } from "../assets/langs";

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
    userLang: user.lang in langs ? langs[user.lang].nativeName : "",
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
      model: LLM_MODEL,
      contents: summarizePrompt,
      config: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: SUMMARY_TEMPERATURE,
        systemInstruction,
      },
    });

    return result.text || "";
  } catch (error) {
    console.error("Error summarizing conversation:", JSON.stringify(error));
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
    // const historyMessage = chatroom.messages
    //   .slice(-SUMMARY_MSG)
    //   .map(convertToChatMessage);

    // const chat = ai.chats.create({
    //   model: LLM_MODEL,
    //   history: historyMessage,
    //   config: {
    //     maxOutputTokens: MAX_OUTPUT_TOKENS,
    //     temperature: model.temperature,
    //     systemInstruction: generateSystemInstruction(
    //       user,
    //       model,
    //       chatroom.summaries
    //     ),
    //     frequencyPenalty: model.frequencyPenalty,
    //     presencePenalty: model.presencePenalty,
    //   },
    // });

    // const result = await chat.sendMessage({
    //   message: message,
    // });

    const messages = [
      ...chatroom.messages,
      {
        sender: "user" as const,
        content: message,
        timestamp: new Date(),
      },
    ]
      .slice(-SUMMARY_MSG - 1)
      .map(convertToChatMessage);

    const result = await ai.models.generateContent({
      model: LLM_MODEL,
      contents: messages,
      config: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: model.temperature,
        systemInstruction: generateSystemInstruction(
          user,
          model,
          chatroom.summaries
        ),
        frequencyPenalty: model.frequencyPenalty,
        presencePenalty: model.presencePenalty,
      },
    });
    return result.text || "";
  } catch (error) {
    console.error("Error generating response:", JSON.stringify(error));
    throw new Error("Failed to generate response");
  }
};

export const generateGreeting = async (
  user: IUser,
  model: Model
): Promise<string> => {
  try {
    const result = await ai.models.generateContent({
      model: LLM_MODEL,
      contents: generateGreetingPrompt(user, model),
      config: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: model.temperature,
        systemInstruction: generateSystemInstruction(user, model, []),
        frequencyPenalty: model.frequencyPenalty,
        presencePenalty: model.presencePenalty,
      },
    });

    return result.text || "";
  } catch (error) {
    console.error("Error generating response:", JSON.stringify(error));
    throw new Error("Failed to generate response");
  }
};
