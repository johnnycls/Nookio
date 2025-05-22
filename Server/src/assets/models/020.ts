import {
  summarizePrompt,
  summarizeSystemInstruction,
} from "../prompt.ts/storySummarizeEn";
import Model from "./model";
import {
  greetingPrompt,
  responseSchema,
  systemInstruction,
} from "../prompt.ts/storyPromptEn";

export const model: Model = {
  _id: "013",
  name: "School Romance Story",
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
