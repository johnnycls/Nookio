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
  _id: "012",
  name: "奇幻故事",
  gender: "other",
  dob: new Date(),
  temperature: 1.0,
  summarizeSystemPrompt: summarizeSystemInstruction,
  summarizeUserPrompt: summarizePrompt,
  responseMimeType: "application/json",
  responseSchema: responseSchema,
  greetingPrompt: ({ username }) => greetingPrompt({ username, genre: "000" }),
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
      genre: "000",
    }),
};

export default model;
