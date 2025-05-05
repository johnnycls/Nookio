import { apiSlice } from "./apiSlice";
import i18next from "i18next";

export type profile = {
  _id: string;
  email: string;
  name: string;
  description: string;
  gender: string;
  dob: Date;
  credit: number;
  chats: string[];
  lang: string;
};

type profileResponse = profile;

type updateProfileRequest = Partial<
  Omit<profile, "_id" | "email" | "credit" | "chats">
>;

type purchaseResponse = {
  url: string;
};

const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<profileResponse, {}>({
      query: ({}) => ({
        url: "user/profile/",
      }),
      providesTags: [{ type: "Profile" }],
      transformResponse: (response: profileResponse) => {
        if (response.lang) {
          i18next.changeLanguage(response.lang);
        }
        return response;
      },
    }),
    updateProfile: builder.mutation<profileResponse, updateProfileRequest>({
      query: (profileData) => ({
        url: "user/profile/",
        method: "PATCH",
        body: profileData,
      }),
      invalidatesTags: [{ type: "Profile" }],
      async onQueryStarted({ lang }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          if (lang) {
            i18next.changeLanguage(lang);
          }
        } catch {
          // Error handling is done by the mutation hook
        }
      },
    }),
    purchaseCredits: builder.mutation<purchaseResponse, { packageId: string }>({
      query: ({ packageId }) => ({
        url: "user/purchase/",
        method: "POST",
        body: { packageId },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  usePurchaseCreditsMutation,
} = userSlice;
