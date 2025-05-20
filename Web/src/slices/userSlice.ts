import { langs } from "../assets/langs";
import { apiSlice } from "./apiSlice";
import i18next from "i18next";

export type profile = {
  _id: string;
  email: string;
  name: string;
  description: string;
  gender: string;
  dob: string;
  credit: number;
  lang: string;
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
        if (response.lang !== "") {
          i18next.changeLanguage(response.lang);
          return response;
        } else if (
          langs.find((lang) => lang.code === i18next.language) !== undefined
        ) {
          return { ...response, lang: i18next.language };
        } else {
          i18next.changeLanguage("zh-HK");
          return { ...response, lang: "zh-HK" };
        }
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
      invalidatesTags: (result, error, profileData) => ["User"],
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
