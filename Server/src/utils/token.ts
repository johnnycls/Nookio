/**
 * Calculate the number of tokens in a text string.
 * This is a rough estimation based on the following rules:
 * - 1 token ≈ 4 characters in English
 * - 1 token ≈ 0.77 characters in Chinese/Japanese (1/1.3)
 * - 1 token ≈ 4 special characters (1/0.25)
 */

export function calculateTokens(text: string): number {
  if (!text) return 0;

  // Count Chinese/Japanese characters (including punctuation)
  const cjkRegex = /[\u4e00-\u9fff\u3040-\u30ff\u3400-\u4dbf]/g;
  const cjkChars = (text.match(cjkRegex) || []).length;

  // Count English characters
  const englishChars = text
    .replace(cjkRegex, "")
    .replace(/[^a-zA-Z0-9\s]/g, "").length;

  // Count special characters and whitespace
  const specialChars = text.replace(
    /[a-zA-Z0-9\u4e00-\u9fff\u3040-\u30ff\u3400-\u4dbf\s]/g,
    ""
  ).length;

  const cjkTokens = cjkChars / 0.77;
  const englishTokens = englishChars / 4;
  const specialTokens = specialChars / 4;

  return Math.ceil(cjkTokens + englishTokens + specialTokens);
}
