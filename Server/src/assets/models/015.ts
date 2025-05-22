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
  _id: "015",
  name: "懸疑故仔",
  gender: "other",
  dob: new Date(),
  temperature: 1.0,
  summarizeSystemPrompt: summarizeSystemInstruction,
  summarizeUserPrompt: summarizePrompt,
  responseMimeType: "application/json",
  responseSchema: responseSchema,
  greetingPrompt: ({ username }) => greetingPrompt({ username, genre: "001" }),
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
      genre: "001",
    }),
};

export default model;
