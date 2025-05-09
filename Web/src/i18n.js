import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    resources: {
      en: {
        translation: {
          error: {
            title: "Error",
            message: "An error occurred",
          },
          loginError: "An error occurred while logging in",
          fetchProfileError: "An error occurred while fetching profile",
          fetchChatroomsError: "An error occurred while fetching chatrooms",
          purchaseCreditsError: "An error occurred while purchasing credits",
          paymentError: "Payment failed. Please try again.",
          updateProfileError: "An error occurred while updating your profile",
          deleteChatroomError: "An error occurred while deleting chatrooms",
          fetchChatroomDetailError:
            "An error occurred while fetching chatroom detail",
          sendMsgError: "An error occurred while sending message: {{error}}",

          home: {
            deleteChatroomConfirmation:
              "Are you sure you want to delete these chatrooms?",
            noChatrooms: "No chatrooms found",
          },

          account: {
            remainingCredit: "Remaining Credits",
            package: "${{price}} - {{credits}} Credits",
            buyCredits: "Buy Credits",
            payment: {
              title: "Complete Payment",
              submit: "Pay Now",
              success: "Payment successful!",
            },
          },

          profile: {
            title: "Profile Setup",
            basicInfo: {
              title: "Basic Information",
              language: {
                label: "Select a Language",
                placeholder: "Select a Language",
              },
              name: {
                label: "Name",
                placeholder: "Name",
              },
              gender: {
                label: "Gender",
                placeholder: "Gender",
                options: {
                  male: "Male",
                  female: "Female",
                  other: "Other",
                },
              },
              dob: {
                label: "Date of Birth",
                placeholder: "Date of Birth",
              },
            },
            description: {
              title: "Description",
              placeholder:
                "Please describe yourself. MBTI, hobbies, interests, occupation, nationality, things you like, things you dislike, etc.",
            },
            matchSettings: {
              title: "Match Settings",
              gender: {
                label: "Match Gender",
                placeholder: "Match Gender",
                options: {
                  male: "Male",
                  female: "Female",
                  both: "Both",
                },
              },
              targetChatrooms: {
                label: "Number of People to Match",
                placeholder: "Number of People to Match",
              },
            },
            navigation: {
              back: "Back",
              next: "Next",
              finish: "Finish",
            },
          },
        },
      },
    },
  });

export default i18n;
