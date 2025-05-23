import {
  summarizePrompt,
  summarizeSystemInstruction,
} from "../prompt.ts/storySummarizeZhHk";
import Model from "./model";
import {
  greetingPrompt,
  responseSchema,
  systemInstruction,
} from "../prompt.ts/storyPromptZhHk";

export const model: Model = {
  _id: "011",
  name: "奇幻故仔",
  gender: "other",
  dob: new Date(),
  temperature: 0.7,
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
