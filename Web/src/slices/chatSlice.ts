import { apiSlice } from "./apiSlice";

type Message = {
  message: string;
  response: string;
  lastReadPosition: number;
  remainingCredits: number;
};

const chatSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<
      Message,
      { chatroomId: string; message: string }
    >({
      query: ({ chatroomId, message }) => ({
        url: `chat/${chatroomId}/`,
        method: "POST",
        body: { message },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSendMessageMutation } = chatSlice;
