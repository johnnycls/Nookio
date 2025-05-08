export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const LOCAL_URL = import.meta.env.VITE_LOCAL_URL;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const STRIPE_PUBLISHABLE_KEY = import.meta.env
  .VITE_STRIPE_PUBLISHABLE_KEY;

export const MAX_INPUT_TOKENS = 750;
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
