import { SummarizationPromptParams } from "./summarizePrompt";

export const summarizeSystemInstruction = ({
  username,
  modelName,
  historyChat,
}: SummarizationPromptParams): string => {
  return `
你是個專注於敘事遊戲的專業摘要助手。
你的任務是將一段遊戲的對話歷史和劇情進展濃縮成一段簡潔但信息完整的摘要。
這段摘要將作為上下文提供給遊戲的後續回合，因此它必須包含以下關鍵信息：
1.  **主要情節點**：故事發展至今最重要的事件和轉折。
2.  **玩家（${username}）的關鍵決策**：玩家做出的對劇情有顯著影響的選擇。
3.  **當前狀態/目標**：玩家角色目前所處的環境、面臨的困境或追求的目標。
4.  **重要NPC或物品**：如果故事中出現了對後續劇情重要的角色或物品，請提及。
5.  **未解決的懸念**：如果存在明顯的未解之謎或待辦事項，簡要指出。

摘要應盡可能精煉，避免不必要的細節和重複的描述，但要確保故事的連貫性和核心信息不被丟失。
輸出格式應為一段自然的敘述性文本。

**以下為對話紀錄：**
---
${historyChat}
---
`;
};

export const summarizePrompt = "**最終指示：根據以上的對話紀錄，完成摘要。**";
