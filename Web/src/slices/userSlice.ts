import { apiSlice } from "./apiSlice";
import i18next from "i18next";

export type profile = {
  _id: string;
  email: string;
  name: string;
  description: string;
  opening: string;
  preferedGender: "male" | "female" | "both";
  gender: string;
  dob: string;
  credit: number;
  lang: string;
  targetChatrooms: number;
};

type profileResponse = profile;

type updateProfileRequest = Partial<Omit<profile, "_id" | "email" | "credit">>;

type purchaseResponse = {
  clientSecret: string;
};

const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<profileResponse, {}>({
      query: () => ({
        url: "user/profile/",
      }),
      transformResponse: (response: profileResponse) => {
        if (response.lang) {
          i18next.changeLanguage(response.lang);
        }
        return response;
      },
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<profileResponse, updateProfileRequest>({
      query: (profileData) => ({
        url: "user/profile/",
        method: "PATCH",
        body: profileData,
      }),
      async onQueryStarted(profileData, {}) {
        try {
          if (profileData.lang) {
            i18next.changeLanguage(profileData.lang);
          }
        } catch {}
      },
      invalidatesTags: (result, error, profileData) =>
        profileData?.targetChatrooms && profileData.targetChatrooms > 0
          ? ["User", "Chatroom"]
          : ["User"],
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
