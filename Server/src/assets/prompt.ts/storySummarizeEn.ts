import { SummarizationPromptParams } from "./summarizePrompt";

export const summarizeSystemInstruction = ({
  username,
  modelName,
  historyChat,
}: SummarizationPromptParams): string => {
  return `
You are a professional summarization assistant specializing in narrative games.
Your task is to condense a game's dialogue history and plot progression into a concise yet informationally complete summary.
This summary will serve as context for subsequent rounds of the game, so it must contain the following key information:
1.  **Main Plot Points**: The most important events and turning points in the story so far.
2.  **Player's (${username}) Key Decisions**: Choices made by the player that significantly impacted the plot.
3.  **Current Status/Objective**: The player character's current environment, predicament, or goal they are pursuing.
4.  **Important NPCs or Items**: Mention any characters or items that have appeared in the story and are important for future plot developments.
5.  **Unresolved Cliffhangers/Loose Ends**: Briefly point out any obvious unsolved mysteries or pending tasks.

The summary should be as refined as possible, avoiding unnecessary details and repetitive descriptions, but ensuring that the story's coherence and core information are not lost.
The output format should be a natural narrative text.

**Below is the dialogue history:**
---
${historyChat}
---
`;
};

export const summarizePrompt =
  "**Final instruction: Based on the dialogue history above, complete the summary.**";
