import { apiSlice } from "./apiSlice";

type Friend = {
  _id: string;
  name: string;
  gender: string;
  dob: string;
};

type Chatroom = {
  _id: string;
  friend: Friend;
  lastMessage: string;
  lastReadPosition: number;
};

type ChatroomDetail = Chatroom & {
  messages: Array<{
    message: string;
    response: string;
    timestamp: string;
  }>;
};

const chatroomSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatrooms: builder.query<Chatroom[], {}>({
      query: () => ({
        url: "chatroom/",
      }),
      providesTags: [{ type: "Chatrooms" }],
    }),
    getChatroomDetail: builder.query<ChatroomDetail, string>({
      query: (chatroomId) => ({
        url: `chatroom/${chatroomId}/`,
      }),
      providesTags: (result, error, chatroomId) => [
        { type: "Chatroom", id: chatroomId },
      ],
    }),
    deleteChatroom: builder.mutation<void, string>({
      query: (chatroomId) => ({
        url: `chatroom/${chatroomId}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, chatroomId) => [
        { type: "Chatrooms" },
        { type: "Chatroom", id: chatroomId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetChatroomsQuery,
  useGetChatroomDetailQuery,
  useDeleteChatroomMutation,
} = chatroomSlice;
