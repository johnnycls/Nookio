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
          settings: {
            settings: "Settings",
            aboutUs: "About Us",
            faq: "FAQ",
          },
          error:
            "An error has occurred. Please ensure you are connected to the network and try reloading. If the issue persists, please try again later.",
          language: "Language",
          copiedToClipboard: "Copied to clipboard",
          success: "Success",
        },
      },
      "zh-TW": {
        translation: {
          settings: {
            settings: "設定",
            aboutUs: "關於我們",
            faq: "常見問題",
          },
        },
        error:
          "發生錯誤。請確保您已連接到網路並重新載入。如果問題持續存在，請稍後再試。",
        language: "語言",
        copiedToClipboard: "已複製到剪貼簿",
        success: "成功",
      },
    },
  });

export default i18n;
