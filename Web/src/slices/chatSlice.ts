import { apiSlice } from "./apiSlice";
import { chatroomSlice, Chatroom, ChatroomDetail } from "./chatroomSlice";

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
