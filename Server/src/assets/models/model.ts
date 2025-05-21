import { GenerateContentConfig } from "@google/genai";
import { SummarizationPromptParams } from "../prompt.ts/summarizePrompt";

type Model = {
  _id: string;
  name: string;
  gender: "male" | "female" | "other";
  dob: Date;
  temperature: number;
  responseMimeType?: string;
  responseSchema?: GenerateContentConfig["responseSchema"];
  summarizeSystemPrompt: ({
    username,
    modelName,
    historyChat,
  }: SummarizationPromptParams) => string;
  summarizeUserPrompt: string;
  greetingPrompt: ({ username }: { username: string }) => string;
  systemInstruction: ({
    username,
    userGender,
    userDescription,
    userDob,
    userLang,
    summaries,
  }: {
    username: string;
    userGender: string;
    userDescription: string;
    userDob: Date;
    userLang: string;
    summaries: string[];
  }) => string;
};

export default Model;
