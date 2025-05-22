import {
  summarizePrompt,
  summarizeSystemInstruction,
} from "../prompt.ts/storySummarizeZhTw";
import Model from "./model";
import {
  greetingPrompt,
  responseSchema,
  systemInstruction,
} from "../prompt.ts/storyPromptZhTw";

export const model: Model = {
  _id: "019",
  name: "校園愛情故事",
  gender: "other",
  dob: new Date(),
  temperature: 1.0,
  summarizeSystemPrompt: summarizeSystemInstruction,
  summarizeUserPrompt: summarizePrompt,
  responseMimeType: "application/json",
  responseSchema: responseSchema,
  greetingPrompt: ({ username }) => greetingPrompt({ username, genre: "002" }),
  systemInstruction: ({
    username,
    userGender,
    userDescription,
    userDob,
    userLang,
    summaries,
  }) =>
    systemInstruction({
      username,
      userGender,
      userDescription,
      userDob,
      userLang,
      summaries,
      genre: "002",
    }),
};

export default model;
