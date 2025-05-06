import { GoogleGenAI } from "@google/genai";
import {
  GEMINI_API_KEY,
  MAX_OUTPUT_TOKENS,
  SUMMARY_TEMPERATURE,
  SUMMARY_LENGTH,
  SUMMARY_MSG,
  NO_SUMMARY_MSG,
} from "../config";
import { IFriend } from "../models/friend.model";
import { IUser } from "../models/user.model";
import { IChatroom, IMessage } from "../models/chatroom.model";

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
  }. Response in ${user.lang}.`;
};

const summarizeConversation = async (
  messages: ChatMessage[],
  user: IUser,
  friend: IFriend
): Promise<string> => {
  try {
    const prompt = `Summarize the following conversation in a concise way that captures the main topics and context. Keep it under ${SUMMARY_LENGTH} words:\n\n${messages
      .map((msg) => `${msg.role}: ${msg.parts[0].text}`)
      .join("\n")}`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: SUMMARY_TEMPERATURE,
        systemInstruction: generateSystemInstruction(user, friend),
      },
    });

    return result.text || "";
  } catch (error) {
    console.error("Error summarizing conversation:", error);
    return "";
  }
};

const convertToChatMessage = (message: IMessage): ChatMessage => ({
  role: message.sender === "user" ? "user" : "model",
  parts: [{ text: message.content }],
});

const getOptimizedChatHistory = async (
  chatroom: IChatroom,
  user: IUser,
  friend: IFriend
): Promise<ChatMessage[]> => {
  const messages = chatroom.messages;
  const totalMessages = messages.length;

  // If we have enough messages to trigger summarization
  if (totalMessages > chatroom.lastSummaryPosition + SUMMARY_MSG) {
    const messagesToSummarize = messages.slice(
      chatroom.lastSummaryPosition,
      chatroom.lastSummaryPosition + SUMMARY_MSG
    );

    // Convert messages to ChatMessage format
    const messagesToSummarizeFormatted =
      messagesToSummarize.map(convertToChatMessage);

    // Generate new summary
    const newSummary = await summarizeConversation(
      messagesToSummarizeFormatted,
      user,
      friend
    );

    // Update chatroom with new summary and position
    chatroom.summaries.push(newSummary);
    chatroom.lastSummaryPosition += SUMMARY_MSG;
    await chatroom.save();
  }

  const contextMessages: ChatMessage[] =
    chatroom.summaries.length > 0
      ? [
          {
            role: "user",
            parts: [
              {
                text: `Previous conversation summaries:\n${chatroom.summaries.join(
                  "\n"
                )}`,
              },
            ],
          },
        ]
      : [];

  const recentMessages = messages.slice(Math.max(0, -NO_SUMMARY_MSG - 1), -1); // Exclude the last message
  return [...contextMessages, ...recentMessages.map(convertToChatMessage)];
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
        temperature: friend.temperature,
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
  chatroom: IChatroom
): Promise<string> => {
  try {
    const optimizedHistory = await getOptimizedChatHistory(
      chatroom,
      user,
      friend
    );

    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: optimizedHistory,
      config: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: friend.temperature,
        systemInstruction: generateSystemInstruction(user, friend),
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
