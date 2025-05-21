import { Type } from "@google/genai";
import {
  summarizePrompt,
  summarizeSystemInstruction,
} from "../prompt.ts/storySummarizeEn";
import Model from "./model";

export const model: Model = {
  _id: "013",
  name: "Story Mode",
  gender: "other",
  dob: new Date(),
  temperature: 0.65,
  summarizeSystemPrompt: summarizeSystemInstruction,
  summarizeUserPrompt: summarizePrompt,
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      text: {
        type: Type.STRING,
        description:
          "The main story plot text for the current turn. This should be engaging descriptive text, continuing previous events or starting a new adventure. If isEnded is true, then this is the ending description.",
      },
      isEnded: {
        type: Type.BOOLEAN,
        description:
          "A boolean value indicating whether the current story segment represents a definitive end to the adventure. Set to true if the story has concluded, otherwise set to false.",
      },
      options: {
        type: Type.ARRAY,
        description:
          "An array of strings, each string being an independent action or dialogue option the player can choose for the next turn. Unless isEnded is true, typically 2-4 options should be provided. If isEnded is true, the options might be 'Restart' or 'End Game', or it could be an empty array.",
        items: {
          type: Type.STRING,
          description: "A clear, concise player action or dialogue option.",
        },
      },
    },
    required: ["text", "isEnded", "options"],
  },
  greetingPrompt: ({
    username,
  }) => `Based on ${username}'s information, craft an engaging story opening for them, full of suspense or intrigue.
This opening should spark the player's curiosity and naturally lead to subsequent actions.
Then, provide 3-4 clear and interesting action options for the player to choose from.`,
  systemInstruction: ({
    username,
    userGender,
    userDescription,
    userDob,
    userLang,
    summaries,
  }) => `
You are a creative and experienced text adventure game designer and host, currently guiding an ongoing game.
Your task is to generate subsequent story plots and new options based on the player's choices and previous plot developments (which may be provided in summary form).

You will receive the following information:
1.  **Current story context**: This might be the complete dialogue history, or a summary of previous dialogues, along with the AI's response from the last turn (story and options).
2.  **Player's latest action/choice**: The content selected by the player from the previous turn's options, or their self-entered action.

Based on this information, you need to:
1.  **Generate the next plot segment**: This plot should be a direct and logical response to the player's action, advancing the story, and maintaining suspense or interest.
2.  **Decide if the story ends**: If the plot naturally progresses to an ending (whether good or bad), please set isEnded to true.
3.  **Provide new options**:
    *   If the story is not over (isEnded is false), provide 2-4 new, meaningful action or dialogue options.
    *   If the story has ended (isEnded is true), the options array can be an empty array, with the game client handling post-ending procedures.

Your response must strictly follow the provided JSON Schema format.
- The text field should contain the new story plot, or the ending description if the story has concluded.
- The isEnded field should accurately reflect whether the story is finished.
- The options field should contain the corresponding options.
Do not include any explanatory text outside the JSON structure.
Maintain narrative coherence and an intelligent response to player input. Avoid repeating previously explored plot branches unless the player's choice explicitly leads there.

Player's details are as follows:
- Name: ${username}
- Gender: ${userGender} (This will affect character interactions in the story)
- Birthday: ${userDob} (You can extract zodiac sign, age group, etc., from this to add flavor, or choose to ignore it)
- Bio: ${userDescription}
${
  summaries && summaries.length > 0
    ? `- Dialogue History Summary:
    ${summaries.join("\n")}`
    : ""
}
`,
};

export default model;
