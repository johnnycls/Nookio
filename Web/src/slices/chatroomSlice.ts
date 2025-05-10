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
      providesTags: ["Chatroom"],
    }),
    getChatroomDetail: builder.query<ChatroomDetail, { chatroomId: string }>({
      query: ({ chatroomId }) => `chatroom/${chatroomId}`,
      providesTags: (result, error, { chatroomId }) => [
        { type: "Chat", id: chatroomId },
      ],
    }),
    deleteChatroom: builder.mutation<void, string[]>({
      query: (chatroomIds) => ({
        url: `chatroom/`,
        method: "DELETE",
        body: { chatroomIds },
      }),
      invalidatesTags: (result, error, chatroomIds) => [
        "Chatroom",
        ...chatroomIds.map((chatroomId) => ({
          type: "Chat" as const,
          id: chatroomId,
        })),
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetChatroomsQuery,
  useLazyGetChatroomDetailQuery,
  useDeleteChatroomMutation,
} = chatroomSlice;
