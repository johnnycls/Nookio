import { apiSlice } from "./apiSlice";

export type Chatroom = {
  _id: string;
  name: string;
  lastMessage: string;
  lastReadPosition: number;
  createdAt: string;
  updatedAt: string;
};

export type ChatroomDetail = Chatroom & {
  messages: {
    message: string;
    response: string;
    timestamp: string;
  }[];
};

export const chatroomSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatrooms: builder.query<Chatroom[], void>({
      query: () => "chatroom",
    }),
    getChatroomDetail: builder.query<ChatroomDetail, string>({
      query: (chatroomId) => `chatroom/${chatroomId}`,
    }),
    createChatroom: builder.mutation<Chatroom, { name: string }>({
      query: (body) => ({
        url: "chatroom",
        method: "POST",
        body,
      }),
      async onQueryStarted({ name }, { dispatch, queryFulfilled }) {
        try {
          const { data: newChatroom } = await queryFulfilled;
          // Update the chatrooms list cache with the new chatroom
          dispatch(
            chatroomSlice.util.updateQueryData(
              "getChatrooms",
              undefined,
              (draft: Chatroom[]) => {
                draft.push(newChatroom);
              }
            )
          );
        } catch {
          // Error handling is done by the mutation hook
        }
      },
    }),
    deleteChatroom: builder.mutation<void, string>({
      query: (chatroomId) => ({
        url: `chatroom/${chatroomId}`,
        method: "DELETE",
      }),
      async onQueryStarted(chatroomId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Remove the chatroom from the list cache
          dispatch(
            chatroomSlice.util.updateQueryData(
              "getChatrooms",
              undefined,
              (draft: Chatroom[]) => {
                const index = draft.findIndex((c) => c._id === chatroomId);
                if (index !== -1) {
                  draft.splice(index, 1);
                }
              }
            )
          );
          // Remove the chatroom detail from the cache
          dispatch(
            chatroomSlice.util.updateQueryData(
              "getChatroomDetail",
              chatroomId,
              () => {
                return undefined;
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

export const {
  useGetChatroomsQuery,
  useGetChatroomDetailQuery,
  useCreateChatroomMutation,
  useDeleteChatroomMutation,
} = chatroomSlice;
