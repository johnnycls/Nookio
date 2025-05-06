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

export const MAX_CHATROOMS = 4;
export const MIN_CREDITS_FOR_AUTO_CHAT = 5;
export const MIN_CREDITS_FOR_RESPONSE = (tokens: number): number => {
  return MIN_CREDITS_FOR_AUTO_CHAT + Math.ceil(tokens / 1000);
};
export const MAX_OUTPUT_TOKENS = 1024;
export const TEMPERATURE = 0.7;
