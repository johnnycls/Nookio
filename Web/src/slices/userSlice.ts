import { apiSlice } from "./apiSlice";
import i18next from "i18next";

export type profile = {
  _id: string;
  email: string;
  name: string;
  description: string;
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
        url: "user/profile",
      }),
      transformResponse: (response: profileResponse) => {
        if (response.lang) {
          i18next.changeLanguage(response.lang);
        }
        return response;
      },
    }),
    updateProfile: builder.mutation<profileResponse, updateProfileRequest>({
      query: (profileData) => ({
        url: "user/profile",
        method: "PATCH",
        body: profileData,
      }),
      async onQueryStarted(profileData, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedProfile } = await queryFulfilled;
          dispatch(
            userSlice.util.updateQueryData("getProfile", {}, (draft) => {
              Object.assign(draft, updatedProfile);
            })
          );
          if (profileData.lang) {
            i18next.changeLanguage(profileData.lang);
          }
        } catch {}
      },
    }),
    purchaseCredits: builder.mutation<purchaseResponse, { packageId: string }>({
      query: ({ packageId }) => ({
        url: "user/purchase",
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
