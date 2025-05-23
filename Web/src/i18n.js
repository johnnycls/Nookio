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
    fallbackLng: "zh-HK",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    resources: {
      en: {
        translation: {
          install: {
            windows: {
              title: "Install Nookio on Windows",
              1: "It's recommended to open this page with Google Chrome",
              2: "Click on the install button at the right of the address bar",
              3: 'Click "Install" in the pop-up window',
            },
            mac: {
              title: "Install Nookio on Mac",
              1: "It's recommended to open this page with Google Chrome",
              2: "Click on the browser menu in the top-right corner",
              3: 'Select "Add to Home Screen" or "Install Nookio" from the menu',
              4: 'Click "Install" in the pop-up window',
            },
            ios: {
              title: "Install Nookio on iOS",
              1: "It's recommended to open this page with Google Chrome",
              2: "Tap the Share button",
              3: "Scroll down and tap 'Add to Home Screen'",
              4: 'Tap "Add" in the top-right corner',
            },
            android: {
              title: "Install Nookio on Android",
              1: "It's recommended to open this page with Google Chrome",
              2: "Tap the browser menu and select 'Add to Home Screen' or 'Install' (if install button is not popped up)",
              3: 'Tap "Install" in the pop-up window',
            },
            unknown: {
              title: "Install Nookio",
              1: "It's recommended to open this page with Google Chrome",
              2: "Look for an 'Install' or 'Add to Home Screen' option in your browser's menu",
              3: 'Tap "Install" or "Add" in the pop-up',
            },
          },
          error: {
            title: "Error",
            message: "An error occurred",
          },
          loginError:
            "An error occurred while logging in, please try again later",
          fetchProfileError:
            "An error occurred while fetching profile, please try again later",
          fetchChatroomsError:
            "An error occurred while fetching chatrooms, please try again later",
          purchaseCreditsError:
            "An error occurred while purchasing credits, please try again later",
          paymentError: "Payment failed. Please try again later",
          updateProfileError:
            "An error occurred while updating your profile, please try again later",
          deleteChatroomError:
            "An error occurred while deleting chatrooms, please try again later",
          fetchChatroomDetailError:
            "An error occurred while fetching chatroom detail, please try again later",
          createChatroomError:
            "An error occurred while creating chatroom, please try again later",
          sendMsgError:
            "An error occurred while sending message, please try again later",

          home: {
            newChatroom: {
              title: "Choose Character",
              create: "Create",
              allLangs: "All Languages",
              male: "Male",
              female: "Female",
              both: "Both",
              noOptions: "No available options",
              allSeries: "All Series",
            },
            deleteChatroomConfirmation:
              "Are you sure you want to delete these chatrooms?",
            noChatrooms:
              "No chatrooms, Please pressed the + button at the top right corner to create chatroom",
          },

          account: {
            remainingCredit: "Remaining Credits",
            package: "USD${{price}} - {{credits}} Credits",
            buyCredits: "Buy Credits",
            payment: {
              title: "Complete Payment",
              submit: "Pay Now",
              success: "Payment successful!",
            },
            explanation: {
              title: "Payment Mode",
              explanation1:
                "Basic Fee: Each time the AI messages or replies, it costs 5 credits.",
              explanation2:
                "First 10 messages: For each AI message, it's an extra 1 credit.",
              explanation3:
                "After 10 messages: Once you've had more than 10 AI messages, it's an extra 1 credit for every 10 additional messages.",
              turn: "Message Number",
              credit: "Credit Use",
            },
            query:
              "If you have any questions, please contact us: contacttrymenow@gmail.com",
          },

          profile: {
            title: "Profile Setup",
            basicInfo: {
              title: "Basic Information",
              language: {
                title: "Language",
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
              label: "The conversation will be more accurate after filling in",
              placeholder:
                "Please describe yourself. MBTI, hobbies, interests, occupation, nationality, things you like, things you dislike, etc.",
              opening:
                "（Optional）Opening message, if not written, the AI will start the conversation",
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
      "zh-TW": {
        translation: {
          install: {
            windows: {
              title: "在 Windows 上安裝 Nookio",
              1: "建議使用 Google Chrome 開啟此頁面",
              2: "點擊地址欄右邊的安裝按鈕",
              3: "在彈出視窗中點擊「安裝」",
            },
            mac: {
              title: "在 Mac 上安裝 Nookio",
              1: "建議使用 Google Chrome 開啟此頁面",
              2: "點擊瀏覽器選單",
              3: "從選單中選擇「安裝 Nookio」",
              4: "在彈出視窗中點擊「安裝」",
            },
            ios: {
              title: "在 iOS 上安裝 Nookio",
              1: "建議使用 Google Chrome 開啟此頁面",
              2: "點擊分享按鈕",
              3: "向下滾動並點擊「新增至主螢幕」",
              4: "點擊右上角的「加入」",
            },
            android: {
              title: "在 Android 上安裝 Nookio",
              1: "建議使用 Google Chrome 開啟此頁面",
              2: "點擊瀏覽器選單並選擇「新增至主螢幕」或「安裝」（如果安裝按鈕未自動彈出）",
              3: "在彈出視窗中點擊「安裝」",
            },
            unknown: {
              title: "安裝 Nookio",
              1: "建議使用 Google Chrome 開啟此頁面",
              2: "在瀏覽器選單中尋找「安裝」或「新增至主螢幕」選項",
              3: "在彈出視窗中點擊「安裝」或「加入」",
            },
          },
          error: {
            title: "錯誤",
            message: "發生錯誤，請稍後再試",
          },
          loginError: "登入時發生錯誤，請稍後再試",
          fetchProfileError: "擷取個人資料時發生錯誤，請稍後再試",
          fetchChatroomsError: "擷取聊天室時發生錯誤，請稍後再試",
          purchaseCreditsError: "購買點數時發生錯誤，請稍後再試",
          paymentError: "付款失敗，請稍後再試",
          updateProfileError: "更新個人資料時發生錯誤，請稍後再試",
          deleteChatroomError: "刪除聊天室時發生錯誤，請稍後再試",
          fetchChatroomDetailError: "擷取聊天室詳細資訊時發生錯誤，請稍後再試",
          createChatroomError: "創建聊天室時發生錯誤，請稍後再試",
          sendMsgError: "傳送訊息時發生錯誤，請稍後再試",
          home: {
            newChatroom: {
              title: "選擇角色",
              create: "開始對話",
              allLangs: "所有語言",
              male: "男性",
              female: "女性",
              both: "皆可",
              noOptions: "沒有符合條件的選項",
              allSeries: "所有系列",
            },
            deleteChatroomConfirmation: "您確定要刪除這些聊天室嗎？",
            noChatrooms: "未有聊天室，請點擊右上角的+按鈕創建聊天室",
          },
          account: {
            remainingCredit: "剩餘點數",
            package: "USD${{price}} - {{credits}} 點數",
            buyCredits: "購買點數",
            payment: {
              title: "完成付款",
              submit: "立即付款",
              success: "付款成功！",
            },
            explanation: {
              title: "付款模式",
              explanation1: "基本費用：AI每次傳送訊息都會消耗5點數",
              explanation2: "前10個訊息：每個訊息會多消耗1點數",
              explanation3: "10個訊息後：每10個訊息才會多消耗1點數",
              turn: "第n個訊息",
              credit: "消耗點數",
            },
            query: "如有任何問題，請聯絡contacttrymenow@gmail.com",
          },
          profile: {
            title: "設定個人資料",
            basicInfo: {
              title: "基本資訊",
              language: {
                title: "語言",
                label: "選擇語言",
                placeholder: "選擇語言",
              },
              name: {
                label: "名稱",
                placeholder: "名稱",
              },
              gender: {
                label: "性別",
                placeholder: "性別",
                options: {
                  male: "男性",
                  female: "女性",
                  other: "其他",
                },
              },
              dob: {
                label: "出生日期",
                placeholder: "出生日期",
              },
            },
            description: {
              title: "描述",
              label: "填上後對話會更精準哦",
              placeholder:
                "請描述您自己。例如 MBTI、嗜好、興趣、職業、國籍、喜歡的事物、不喜歡的事物等。",
              opening: "（選填）開場白，如果未寫，AI 將開始對話",
            },
            matchSettings: {
              title: "配對設定",
              gender: {
                label: "配對性別",
                placeholder: "配對性別",
                options: {
                  male: "男性",
                  female: "女性",
                  both: "皆可",
                },
              },
              targetChatrooms: {
                label: "配對人數",
                placeholder: "配對人數",
              },
            },
            navigation: {
              back: "返回",
              next: "下一步",
              finish: "完成",
            },
          },
        },
      },
      "zh-HK": {
        translation: {
          install: {
            windows: {
              title: "喺Windows Download Nookio",
              1: "建議用Google Chrome開",
              2: "撳Address Bar右邊嘅安裝制",
              3: "喺個Popup到撳「安裝」",
            },
            mac: {
              title: "喺Mac Download Nookio",
              1: "建議用Google Chrome開",
              2: "撳Browser嘅選單",
              3: "揀「安裝 Nookio」",
            },
            ios: {
              title: "喺iOS Download Nookio",
              1: "建議用Google Chrome開",
              2: "撳Share制",
              3: "向下碌然後撳「新增至主螢幕」或者「安裝」",
              4: "撳右上角嘅「加入」",
            },
            android: {
              title: "喺Android Download Nookio",
              1: "建議用Google Chrome開",
              2: "撳Browser嘅Menu然後揀「新增至主螢幕」或者「安裝」（如果安裝制唔彈出）",
              3: "喺個Popup到撳「安裝」",
            },
            unknown: {
              title: "Download Nookio",
              1: "建議用Google Chrome開",
              2: "喺Browser Menu或者Address Bar度搵「安裝」或「新增至主螢幕」",
              3: "喺個Popup到撳「安裝」或「加入」",
            },
          },
          error: {
            title: "Bug咗",
            message: "Bug L咗",
          },
          loginError: "登入嘅時候Bug L咗，請稍後再試",
          fetchProfileError: "fetch profile嘅時候Bug L咗，請稍後再試",
          fetchChatroomsError: "fetch chatrooms嘅時候Bug L咗，請稍後再試",
          purchaseCreditsError: "買點數嘅時候Bug L咗，請稍後再試",
          paymentError: "俾錢嘅時候Bug L咗，請稍後再試",
          updateProfileError: "更新profile嘅時候Bug L咗，請稍後再試",
          deleteChatroomError: "剷chatroom嘅時候Bug L咗，請稍後再試",
          fetchChatroomDetailError: "攞chatroom詳情嘅時候Bug L咗，請稍後再試",
          createChatroomError: "創建chatroom嘅時候Bug L咗，請稍後再試",
          sendMsgError: "send msg嘅時候Bug L咗，請稍後再試",
          home: {
            newChatroom: {
              title: "選擇角色",
              create: "開始對話",
              allLangs: "所有語言",
              male: "男",
              female: "女",
              both: "都得",
              noOptions: "冇符合條件嘅選項",
              allSeries: "所有系列",
            },
            deleteChatroomConfirmation: "您真係要剷依啲chatrooms？",
            noChatrooms: "未有chatrooms，請撳右上角嘅+制創建chatroom",
          },
          account: {
            remainingCredit: "剩返幾多點數",
            package: "USD${{price}} - {{credits}} 點數",
            buyCredits: "買點數",
            payment: {
              title: "俾錢",
              submit: "即刻俾錢",
              success: "俾錢成功！",
            },
            explanation: {
              title: "點收費",
              explanation1: "基本費用：AI每次send嘢俾你都要用5點數",
              explanation2: "前10訊息：頭十個AI嘅訊息，每個訊息會用多1點數",
              explanation3:
                "10個訊息之後：一旦send多過10個訊息，每10個訊息先會用多1點數",
              turn: "第n個訊息",
              credit: "消耗點數",
            },
            query: "如有任何問題，請聯絡contacttrymenow@gmail.com",
          },
          profile: {
            title: "set個人資料",
            basicInfo: {
              title: "基本資料",
              language: {
                title: "語言",
                label: "揀語言",
                placeholder: "揀語言",
              },
              name: {
                label: "名",
                placeholder: "名",
              },
              gender: {
                label: "性別",
                placeholder: "性別",
                options: {
                  male: "男性",
                  female: "女性",
                  other: "其他",
                },
              },
              dob: {
                label: "出生日期",
                placeholder: "出生日期",
              },
            },
            description: {
              title: "形容自己",
              label: "填咗之後對話會更加精準",
              placeholder:
                "請形容一下你自己。例如MBTI、興趣、職業、鍾意嘅嘢、唔鍾意嘅嘢等。",
              opening: "（選填）開場白，如果唔寫就會由AI開始對話",
            },
            matchSettings: {
              title: "配對設定",
              gender: {
                label: "配對性別",
                placeholder: "配對性別",
                options: {
                  male: "男性",
                  female: "女性",
                  both: "都好",
                },
              },
              targetChatrooms: {
                label: "配對人數",
                placeholder: "配對人數",
              },
            },
            navigation: {
              back: "返回",
              next: "下一步",
              finish: "完成",
            },
          },
        },
      },
    },
  });

export default i18n;
