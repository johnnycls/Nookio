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
                "Starting Fee: Each time the AI messages or replies, it costs 5 credits.",
              explanation2:
                "Early Conversation (First 10 turns): For each of the first 10 back-and-forth exchanges (turns), it's an extra 1 credit per turn.",
              explanation3:
                "Longer Conversation (After 10 turns): Once you've had more than 10 turns, it's an extra 1 credit for every 10 additional turns.",
              turn: "Turn",
              credit: "Credit Use",
            },
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
              3: "向下滾動並點擊「加入主畫面」",
              4: "點擊右上角的「加入」",
            },
            android: {
              title: "在 Android 上安裝 Nookio",
              1: "建議使用 Google Chrome 開啟此頁面",
              2: "點擊瀏覽器選單並選擇「加入主畫面」或「安裝」（如果安裝按鈕未自動彈出）",
              3: "在彈出視窗中點擊「安裝」",
            },
            unknown: {
              title: "安裝 Nookio",
              1: "建議使用 Google Chrome 開啟此頁面",
              2: "在瀏覽器選單中尋找「安裝」或「加入主畫面」選項",
              3: "在彈出視窗中點擊「安裝」或「加入」",
            },
          },
          error: {
            title: "錯誤",
            message: "發生錯誤",
          },
          loginError: "登入時發生錯誤",
          fetchProfileError: "擷取個人資料時發生錯誤",
          fetchChatroomsError: "擷取聊天室時發生錯誤",
          purchaseCreditsError: "購買點數時發生錯誤",
          paymentError: "付款失敗。請再試一次。",
          updateProfileError: "更新個人資料時發生錯誤",
          deleteChatroomError: "刪除聊天室時發生錯誤",
          fetchChatroomDetailError: "擷取聊天室詳細資訊時發生錯誤",
          sendMsgError: "傳送訊息時發生錯誤：{{error}}",
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
              explanation1: "起始費用：AI 每次傳送訊息或回覆，將消耗5點數。",
              explanation2:
                "初期對話（前10回合）：在前10次來回交流（回合）中，每回合額外消耗1點數。",
              explanation3:
                "較長對話（10回合後）：一旦對話超過 10 回合，每10回合將額外消耗1點數。",
              turn: "回合",
              credit: "消耗點數",
            },
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
              3: "向下碌然後撳「加入主畫面」或者「安裝」",
              4: "撳右上角嘅「加入」",
            },
            android: {
              title: "喺Android Download Nookio",
              1: "建議用Google Chrome開",
              2: "撳Browser嘅Menu然後揀「加入主畫面」或者「安裝」（如果安裝制唔彈出）",
              3: "喺個Popup到撳「安裝」",
            },
            unknown: {
              title: "Download Nookio",
              1: "建議用Google Chrome開",
              2: "喺Browser Menu或者Address Bar度搵「安裝」或「加入主畫面」",
              3: "喺個Popup到撳「安裝」或「加入」",
            },
          },
          error: {
            title: "Bug咗",
            message: "Bug L咗",
          },
          loginError: "登入嘅時候Bug L咗",
          fetchProfileError: "fetch profile嘅時候Bug L咗",
          fetchChatroomsError: "fetch chatrooms嘅時候Bug L咗",
          purchaseCreditsError: "買點數嘅時候Bug L咗",
          paymentError: "俾錢嘅時候Bug L咗",
          updateProfileError: "更新profile嘅時候Bug L咗",
          deleteChatroomError: "剷chatroom嘅時候Bug L咗",
          fetchChatroomDetailError: "攞chatroom詳情嘅時候Bug L咗",
          sendMsgError: "send msg嘅時候Bug L咗：{{error}}",
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
              explanation1: "起始費用：AI每次send嘢俾你都要用5點數。",
              explanation2:
                "初期對話（前10回合）：在前10次來回交流中，每回合額外用1點數。",
              explanation3:
                "較長對話（10回合後）：一旦對話超過 10 回合，每10回合將額外消耗1點數。",
              turn: "回合",
              credit: "消耗點數",
            },
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
      "zh-CN": {
        translation: {
          install: {
            windows: {
              title: "在 Windows 上安装 Nookio",
              1: "建议使用 Google Chrome 打开此页面",
              2: "点击地址栏右侧的安装按钮",
              3: "在弹出窗口中点击“安装”",
            },
            mac: {
              title: "在 Mac 上安装 Nookio",
              1: "建议使用 Google Chrome 打开此页面",
              2: "点击浏览器的菜单",
              3: "选择“安装 Nookio”或“加入主画面”",
            },
            ios: {
              title: "在 iOS 上安装 Nookio",
              1: "建议使用 Google Chrome 打开此页面",
              2: "点击分享按钮",
              3: "向下滚动并点击“添加到主屏幕”",
              4: "点击右上角的“添加”",
            },
            android: {
              title: "在 Android 上安装 Nookio",
              1: "建议使用 Google Chrome 打开此页面",
              2: "点击浏览器菜单，并选择“安装 Nookio”或“加入主画面”（如果安装按钮未自动弹出）",
              3: "在弹出窗口中点击“安装”",
            },
            unknown: {
              title: "安装 Nookio",
              1: "建议使用 Google Chrome 打开此页面",
              2: "在浏览器菜单中寻找“安装”或“添加到主屏幕”选项",
              3: "在弹出窗口中点击“安装”或“添加”",
            },
          },
          error: {
            title: "错误",
            message: "发生了一个错误",
          },
          loginError: "登录时发生错误",
          fetchProfileError: "获取个人资料时发生错误",
          fetchChatroomsError: "获取聊天室时发生错误",
          purchaseCreditsError: "购买积分时发生错误",
          paymentError: "支付失败。请重试。",
          updateProfileError: "更新个人资料时发生错误",
          deleteChatroomError: "删除聊天室时发生错误",
          fetchChatroomDetailError: "获取聊天室详情时发生错误",
          sendMsgError: "发送消息时发生错误：{{error}}",
          home: {
            newChatroom: {
              title: "选择角色",
              create: "开始对话",
              allLangs: "所有语言",
              male: "男",
              female: "女",
              both: "都行",
              noOptions: "没有符合条件的选项",
              allSeries: "所有系列",
            },
            deleteChatroomConfirmation: "您确定要删除这些聊天室吗？",
            noChatrooms: "未有聊天室，请按右上角的+按钮创建聊天室",
          },
          account: {
            remainingCredit: "剩余积分",
            package: "USD${{price}} - {{credits}} 积分",
            buyCredits: "购买积分",
            payment: {
              title: "完成支付",
              submit: "立即支付",
              success: "支付成功！",
            },
            explanation: {
              title: "计费模式",
              explanation1: "起始费用：AI 每次发送消息或回复，消耗 5 积分。",
              explanation2:
                "初期对话（前 10 轮）：在前 10 次互动（轮）中，每轮额外消耗 1 积分。",
              explanation3:
                "较长对话（10 轮后）：一旦对话超过10轮，每10轮额外消耗 1 积分。",
              turn: "轮",
              credit: "消耗积分",
            },
          },
          profile: {
            title: "设置个人资料",
            basicInfo: {
              title: "基本信息",
              language: {
                title: "语言",
                label: "选择语言",
                placeholder: "选择语言",
              },
              name: {
                label: "名称",
                placeholder: "名称",
              },
              gender: {
                label: "性别",
                placeholder: "性别",
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
              placeholder:
                "请描述您自己。例如 MBTI、爱好、兴趣、职业、国籍、喜欢的事物、不喜欢的事物等。",
              opening: "（选填）开场白，如果未写，AI 将开始对话",
            },
            matchSettings: {
              title: "匹配设置",
              gender: {
                label: "匹配性别",
                placeholder: "匹配性别",
                options: {
                  male: "男性",
                  female: "女性",
                  both: "皆可",
                },
              },
              targetChatrooms: {
                label: "匹配人数",
                placeholder: "匹配人数",
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
