import { apiSlice } from "./apiSlice";

const chatSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<
      void,
      { chatroomId: string; message: string }
    >({
      query: ({ chatroomId, message }) => ({
        url: `chat/${chatroomId}/`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: (result, error, { chatroomId }) => [
        { type: "Chat", id: chatroomId },
        "Chatroom",
        "User",
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useSendMessageMutation } = chatSlice;
