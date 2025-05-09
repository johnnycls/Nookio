import { apiSlice } from "./apiSlice";

export type Message = {
  content: string;
  sender: string;
  timestamp: string;
};

export type Chatroom = {
  _id: string;
  lastMessage: Message;
  lastReadPosition: number;
  model: {
    _id: string;
    name: string;
    gender: string;
    dob: string;
    avatar: string;
  };
};

export type ChatroomDetail = {
  _id: string;
  messages: Message[];
  lastReadPosition: number;
  model: {
    _id: string;
    name: string;
    gender: string;
    dob: string;
    avatar: string;
  };
};

export const chatroomSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatrooms: builder.query<Chatroom[], {}>({
      query: () => "chatroom/",
    }),
    getChatroomDetail: builder.query<ChatroomDetail, { chatroomId: string }>({
      query: ({ chatroomId }) => `chatroom/${chatroomId}`,
    }),
    deleteChatroom: builder.mutation<void, string[]>({
      query: (chatroomIds) => ({
        url: `chatroom/`,
        method: "DELETE",
        body: { chatroomIds },
      }),
      async onQueryStarted(chatroomIds, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Remove the chatroom from the list cache
          dispatch(
            chatroomSlice.util.updateQueryData(
              "getChatrooms",
              {},
              (draft: Chatroom[]) => {
                Object.assign(
                  draft,
                  draft.filter((c) => !chatroomIds.includes(c._id))
                );
              }
            )
          );
          // Remove the chatroom detail from the cache
          chatroomIds.forEach((chatroomId) => {
            dispatch(
              chatroomSlice.util.updateQueryData(
                "getChatroomDetail",
                { chatroomId },
                () => {
                  return undefined;
                }
              )
            );
          });
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
  useLazyGetChatroomDetailQuery,
  useDeleteChatroomMutation,
} = chatroomSlice;
