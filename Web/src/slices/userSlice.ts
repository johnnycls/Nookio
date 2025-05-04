import { apiSlice } from "./apiSlice";

export type profile = {
  _id: string;
  email: string;
  name: string;
  description: string;
  gender: string;
  dob: Date;
  credit: number;
  chats: string[];
};

type profileResponse = profile;

const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<profileResponse, {}>({
      query: ({}) => ({
        url: "user/profile/",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfileQuery } = userSlice;
