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

export const CREDIT_PACKAGES = [
  {
    id: "0",
    credits: 3000,
    price: 2.49,
  },
  {
    id: "1",
    credits: 8000,
    price: 4.99,
  },
  {
    id: "2",
    credits: 20000,
    price: 9.99,
  },
  {
    id: "3",
    credits: 50000,
    price: 19.99,
  },
];

export const NAME_LENGTH_LIMIT = 20;
export const DESCRIPTION_LENGTH_LIMIT = 300;
export const MESSAGE_LENGTH_LIMIT = 300;
