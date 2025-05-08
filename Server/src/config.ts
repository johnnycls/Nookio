import dotenv from "dotenv";
dotenv.config();

// Environment variables
export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY;
export const WEB_URL = process.env.WEB_URL;
export const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const MAX_INPUT_TOKENS = 750;
export const MAX_OUTPUT_TOKENS = 750;

export const SUMMARY_TEMPERATURE = 0.3;
export const SUMMARY_MSG = 20;

export const MAX_CHATROOMS = 4;
export const MIN_CREDITS_FOR_AUTO_CHAT = 5;

export const CREDITS_FOR_RESPONSE = (history_length: number): number => {
  const messagePairs = Math.ceil(history_length / 2);
  const summaryPairs = Math.ceil(SUMMARY_MSG / 2);
  return (
    MIN_CREDITS_FOR_AUTO_CHAT +
    (messagePairs <= summaryPairs
      ? messagePairs
      : summaryPairs + Math.floor((messagePairs - summaryPairs) / summaryPairs))
  );
};

export const FREQUENCY_PENALTY = 0.2;
export const PRESENCE_PENALTY = 0.2;
