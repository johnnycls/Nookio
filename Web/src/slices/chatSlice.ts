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
      async onQueryStarted(
        { chatroomId, message },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data: newMessage } = await queryFulfilled;
          // Update the chatroom detail cache with the new message
          dispatch(
            chatroomSlice.util.updateQueryData(
              "getChatroomDetail",
              chatroomId,
              (draft: ChatroomDetail | undefined) => {
                if (draft) {
                  draft.messages.push({
                    message: message,
                    response: "user",
                    timestamp: new Date().toISOString(),
                  });
                  draft.messages.push({
                    message: newMessage.message,
                    response: newMessage.response,
                    timestamp: new Date().toISOString(),
                  });
                  draft.lastReadPosition = newMessage.lastReadPosition;
                }
              }
            )
          );
          // Update the chatrooms list cache with the new last message
          dispatch(
            chatroomSlice.util.updateQueryData(
              "getChatrooms",
              undefined,
              (draft: Chatroom[]) => {
                const chatroom = draft.find(
                  (c: Chatroom) => c._id === chatroomId
                );
                if (chatroom) {
                  chatroom.lastMessage = newMessage.response;
                  chatroom.lastReadPosition = newMessage.lastReadPosition;
                }
              }
            )
          );
        } catch {
          // Error handling is done by the mutation hook
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useSendMessageMutation } = chatSlice;
