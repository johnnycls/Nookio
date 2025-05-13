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
              credit: "Credit",
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
            deleteChatroomConfirmation: "您確定要刪除這些聊天室嗎？",
            noChatrooms: "找不到聊天室",
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
              credit: "點數",
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
            deleteChatroomConfirmation: "您真係要剷依啲chatrooms？",
            noChatrooms: "搵唔到chatrooms",
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
              credit: "點數",
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
            deleteChatroomConfirmation: "您确定要删除这些聊天室吗？",
            noChatrooms: "未找到聊天室",
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
              credit: "积分",
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
      es: {
        translation: {
          error: {
            title: "Error",
            message: "Ocurrió un error",
          },
          loginError: "Ocurrió un error al iniciar sesión",
          fetchProfileError: "Ocurrió un error al obtener el perfil",
          fetchChatroomsError: "Ocurrió un error al obtener las salas de chat",
          purchaseCreditsError: "Ocurrió un error al comprar créditos",
          paymentError: "Pago fallido. Por favor, inténtalo de nuevo.",
          updateProfileError: "Ocurrió un error al actualizar tu perfil",
          deleteChatroomError: "Ocurrió un error al eliminar las salas de chat",
          fetchChatroomDetailError:
            "Ocurrió un error al obtener los detalles de la sala de chat",
          sendMsgError: "Ocurrió un error al enviar el mensaje: {{error}}",
          home: {
            deleteChatroomConfirmation:
              "¿Estás seguro de que quieres eliminar estas salas de chat?",
            noChatrooms: "No se encontraron salas de chat",
          },
          account: {
            remainingCredit: "Créditos restantes",
            package: "USD${{price}} - {{credits}} Créditos",
            buyCredits: "Comprar Créditos",
            payment: {
              title: "Completar Pago",
              submit: "Pagar Ahora",
              success: "¡Pago exitoso!",
            },
            explanation: {
              title: "Modo de Pago",
              explanation1:
                "Tarifa Inicial: Cada vez que la IA envía un mensaje o responde, cuesta 5 créditos.",
              explanation2:
                "Conversación Temprana (Primeros 10 turnos): Por cada uno de los primeros 10 intercambios (turnos), es 1 crédito extra por turno.",
              explanation3:
                "Conversación Larga (Después de 10 turnos): Una vez que has tenido más de 10 turnos, es 1 crédito extra por cada 10 turnos adicionales.",
              turn: "Turno",
              credit: "Crédito",
            },
          },
          profile: {
            title: "Configuración del Perfil",
            basicInfo: {
              title: "Información Básica",
              language: {
                title: "Idioma",
                label: "Selecciona un Idioma",
                placeholder: "Selecciona un Idioma",
              },
              name: {
                label: "Nombre",
                placeholder: "Nombre",
              },
              gender: {
                label: "Género",
                placeholder: "Género",
                options: {
                  male: "Masculino",
                  female: "Femenino",
                  other: "Otro",
                },
              },
              dob: {
                label: "Fecha de Nacimiento",
                placeholder: "Fecha de Nacimiento",
              },
            },
            description: {
              title: "Descripción",
              placeholder:
                "Por favor, descríbete. MBTI, pasatiempos, intereses, ocupación, nacionalidad, cosas que te gustan, cosas que no te gustan, etc.",
            },
            matchSettings: {
              title: "Configuración de Coincidencia",
              gender: {
                label: "Género de Coincidencia",
                placeholder: "Género de Coincidencia",
                options: {
                  male: "Masculino",
                  female: "Femenino",
                  both: "Ambos",
                },
              },
              targetChatrooms: {
                label: "Número de Personas para Coincidir",
                placeholder: "Número de Personas para Coincidir",
              },
            },
            navigation: {
              back: "Atrás",
              next: "Siguiente",
              finish: "Finalizar",
            },
          },
        },
      },
      fr: {
        translation: {
          error: {
            title: "Erreur",
            message: "Une erreur est survenue",
          },
          loginError: "Une erreur est survenue lors de la connexion",
          fetchProfileError:
            "Une erreur est survenue lors de la récupération du profil",
          fetchChatroomsError:
            "Une erreur est survenue lors de la récupération des salons de discussion",
          purchaseCreditsError:
            "Une erreur est survenue lors de l'achat de crédits",
          paymentError: "Paiement échoué. Veuillez réessayer.",
          updateProfileError:
            "Une erreur est survenue lors de la mise à jour de votre profil",
          deleteChatroomError:
            "Une erreur est survenue lors de la suppression des salons de discussion",
          fetchChatroomDetailError:
            "Une erreur est survenue lors de la récupération des détails du salon de discussion",
          sendMsgError:
            "Une erreur est survenue lors de l'envoi du message : {{error}}",
          home: {
            deleteChatroomConfirmation:
              "Êtes-vous sûr de vouloir supprimer ces salons de discussion ?",
            noChatrooms: "Aucun salon de discussion trouvé",
          },
          account: {
            remainingCredit: "Crédits Restants",
            package: "USD${{price}} - {{credits}} Crédits",
            buyCredits: "Acheter des Crédits",
            payment: {
              title: "Finaliser le Paiement",
              submit: "Payer Maintenant",
              success: "Paiement réussi !",
            },
            explanation: {
              title: "Mode de Paiement",
              explanation1:
                "Frais de Démarrage : Chaque fois que l'IA envoie un message ou répond, cela coûte 5 crédits.",
              explanation2:
                "Début de Conversation (10 premiers tours) : Pour chacun des 10 premiers échanges (tours), c'est 1 crédit supplémentaire par tour.",
              explanation3:
                "Conversation Plus Longue (Après 10 tours) : Une fois que vous avez eu plus de 10 tours, c'est 1 crédit supplémentaire pour chaque 10 tours additionnels.",
              turn: "Tour",
              credit: "Crédit",
            },
          },
          profile: {
            title: "Configuration du Profil",
            basicInfo: {
              title: "Informations de Base",
              language: {
                title: "Langue",
                label: "Sélectionnez une Langue",
                placeholder: "Sélectionnez une Langue",
              },
              name: {
                label: "Nom",
                placeholder: "Nom",
              },
              gender: {
                label: "Genre",
                placeholder: "Genre",
                options: {
                  male: "Homme",
                  female: "Femme",
                  other: "Autre",
                },
              },
              dob: {
                label: "Date de Naissance",
                placeholder: "Date de Naissance",
              },
            },
            description: {
              title: "Description",
              placeholder:
                "Veuillez vous décrire. MBTI, loisirs, centres d'intérêt, profession, nationalité, ce que vous aimez, ce que vous n'aimez pas, etc.",
            },
            matchSettings: {
              title: "Paramètres de Correspondance",
              gender: {
                label: "Genre de Correspondance",
                placeholder: "Genre de Correspondance",
                options: {
                  male: "Homme",
                  female: "Femme",
                  both: "Les deux",
                },
              },
              targetChatrooms: {
                label: "Nombre de Personnes à Mettre en Correspondance",
                placeholder: "Nombre de Personnes à Mettre en Correspondance",
              },
            },
            navigation: {
              back: "Retour",
              next: "Suivant",
              finish: "Terminer",
            },
          },
        },
      },
      ja: {
        translation: {
          error: {
            title: "エラー",
            message: "エラーが発生しました",
          },
          loginError: "ログイン中にエラーが発生しました",
          fetchProfileError: "プロフィールの取得中にエラーが発生しました",
          fetchChatroomsError: "チャットルームの取得中にエラーが発生しました",
          purchaseCreditsError: "クレジットの購入中にエラーが発生しました",
          paymentError: "支払いに失敗しました。もう一度お試しください。",
          updateProfileError: "プロフィールの更新中にエラーが発生しました",
          deleteChatroomError: "チャットルームの削除中にエラーが発生しました",
          fetchChatroomDetailError:
            "チャットルーム詳細の取得中にエラーが発生しました",
          sendMsgError: "メッセージ送信中にエラーが発生しました：{{error}}",
          home: {
            deleteChatroomConfirmation:
              "これらのチャットルームを削除してもよろしいですか？",
            noChatrooms: "チャットルームが見つかりません",
          },
          account: {
            remainingCredit: "残りのクレジット",
            package: "USD${{price}} - {{credits}} クレジット",
            buyCredits: "クレジットを購入",
            payment: {
              title: "支払いを完了",
              submit: "今すぐ支払う",
              success: "支払いが成功しました！",
            },
            explanation: {
              title: "支払いモード",
              explanation1:
                "開始料金：AIがメッセージを送信または返信するたびに、5クレジットかかります。",
              explanation2:
                "初期の会話（最初の10ターン）：最初の10回のやり取り（ターン）それぞれについて、1ターンあたり追加で1クレジットかかります。",
              explanation3:
                "長時間の会話（10ターン後）：10ターンを超えると、追加の10ターンごとに1クレジットかかります。",
              turn: "ターン",
              credit: "クレジット",
            },
          },
          profile: {
            title: "プロフィール設定",
            basicInfo: {
              title: "基本情報",
              language: {
                title: "言語",
                label: "言語を選択",
                placeholder: "言語を選択",
              },
              name: {
                label: "名前",
                placeholder: "名前",
              },
              gender: {
                label: "性別",
                placeholder: "性別",
                options: {
                  male: "男性",
                  female: "女性",
                  other: "その他",
                },
              },
              dob: {
                label: "生年月日",
                placeholder: "生年月日",
              },
            },
            description: {
              title: "自己紹介",
              placeholder:
                "自己紹介を記入してください。MBTI、趣味、興味、職業、国籍、好きなこと、嫌いなことなど。",
            },
            matchSettings: {
              title: "マッチング設定",
              gender: {
                label: "マッチングする性別",
                placeholder: "マッチングする性別",
                options: {
                  male: "男性",
                  female: "女性",
                  both: "両方",
                },
              },
              targetChatrooms: {
                label: "マッチングする人数",
                placeholder: "マッチングする人数",
              },
            },
            navigation: {
              back: "戻る",
              next: "次へ",
              finish: "完了",
            },
          },
        },
      },
      ko: {
        translation: {
          error: {
            title: "오류",
            message: "오류가 발생했습니다",
          },
          loginError: "로그인 중 오류가 발생했습니다",
          fetchProfileError: "프로필을 가져오는 중 오류가 발생했습니다",
          fetchChatroomsError: "채팅방을 가져오는 중 오류가 발생했습니다",
          purchaseCreditsError: "크레딧 구매 중 오류가 발생했습니다",
          paymentError: "결제에 실패했습니다. 다시 시도해주세요.",
          updateProfileError: "프로필 업데이트 중 오류가 발생했습니다",
          deleteChatroomError: "채팅방 삭제 중 오류가 발생했습니다",
          fetchChatroomDetailError:
            "채팅방 세부 정보를 가져오는 중 오류가 발생했습니다",
          sendMsgError: "메시지 전송 중 오류 발생: {{error}}",
          home: {
            deleteChatroomConfirmation: "이 채팅방들을 삭제하시겠습니까?",
            noChatrooms: "채팅방을 찾을 수 없습니다",
          },
          account: {
            remainingCredit: "남은 크레딧",
            package: "USD${{price}} - {{credits}} 크레딧",
            buyCredits: "크레딧 구매",
            payment: {
              title: "결제 완료",
              submit: "지금 결제",
              success: "결제 성공!",
            },
            explanation: {
              title: "결제 방식",
              explanation1:
                "시작 비용: AI가 메시지를 보내거나 답장할 때마다 5 크레딧이 소모됩니다.",
              explanation2:
                "초기 대화 (처음 10턴): 처음 10번의 대화(턴) 각각에 대해 턴당 추가 1 크레딧이 소모됩니다.",
              explanation3:
                "긴 대화 (10턴 이후): 10턴을 초과하면 추가 10턴마다 1 크레딧이 소모됩니다.",
              turn: "턴",
              credit: "크레딧",
            },
          },
          profile: {
            title: "프로필 설정",
            basicInfo: {
              title: "기본 정보",
              language: {
                title: "언어",
                label: "언어 선택",
                placeholder: "언어 선택",
              },
              name: {
                label: "이름",
                placeholder: "이름",
              },
              gender: {
                label: "성별",
                placeholder: "성별",
                options: {
                  male: "남성",
                  female: "여성",
                  other: "기타",
                },
              },
              dob: {
                label: "생년월일",
                placeholder: "생년월일",
              },
            },
            description: {
              title: "소개",
              placeholder:
                "자신을 설명해주세요. MBTI, 취미, 관심사, 직업, 국적, 좋아하는 것, 싫어하는 것 등.",
            },
            matchSettings: {
              title: "매칭 설정",
              gender: {
                label: "매칭 성별",
                placeholder: "매칭 성별",
                options: {
                  male: "남성",
                  female: "여성",
                  both: "모두",
                },
              },
              targetChatrooms: {
                label: "매칭할 사람 수",
                placeholder: "매칭할 사람 수",
              },
            },
            navigation: {
              back: "뒤로",
              next: "다음",
              finish: "완료",
            },
          },
        },
      },
      ru: {
        translation: {
          error: {
            title: "Ошибка",
            message: "Произошла ошибка",
          },
          loginError: "Произошла ошибка при входе в систему",
          fetchProfileError: "Произошла ошибка при загрузке профиля",
          fetchChatroomsError: "Произошла ошибка при загрузке чатов",
          purchaseCreditsError: "Произошла ошибка при покупке кредитов",
          paymentError: "Платеж не удался. Пожалуйста, попробуйте еще раз.",
          updateProfileError: "Произошла ошибка при обновлении вашего профиля",
          deleteChatroomError: "Произошла ошибка при удалении чатов",
          fetchChatroomDetailError:
            "Произошла ошибка при загрузке деталей чата",
          sendMsgError: "Произошла ошибка при отправке сообщения: {{error}}",
          home: {
            deleteChatroomConfirmation:
              "Вы уверены, что хотите удалить эти чаты?",
            noChatrooms: "Чаты не найдены",
          },
          account: {
            remainingCredit: "Оставшиеся кредиты",
            package: "USD${{price}} - {{credits}} кредитов",
            buyCredits: "Купить кредиты",
            payment: {
              title: "Завершить платеж",
              submit: "Оплатить сейчас",
              success: "Платеж успешно выполнен!",
            },
            explanation: {
              title: "Режим оплаты",
              explanation1:
                "Начальная плата: Каждый раз, когда ИИ отправляет сообщение или отвечает, это стоит 5 кредитов.",
              explanation2:
                "Начало разговора (первые 10 ходов): За каждый из первых 10 обменов сообщениями (ходов) взимается дополнительно 1 кредит за ход.",
              explanation3:
                "Длительный разговор (после 10 ходов): После более чем 10 ходов взимается дополнительно 1 кредит за каждые 10 дополнительных ходов.",
              turn: "Ход",
              credit: "Кредит",
            },
          },
          profile: {
            title: "Настройка профиля",
            basicInfo: {
              title: "Основная информация",
              language: {
                title: "Язык",
                label: "Выберите язык",
                placeholder: "Выберите язык",
              },
              name: {
                label: "Имя",
                placeholder: "Имя",
              },
              gender: {
                label: "Пол",
                placeholder: "Пол",
                options: {
                  male: "Мужской",
                  female: "Женский",
                  other: "Другой",
                },
              },
              dob: {
                label: "Дата рождения",
                placeholder: "Дата рождения",
              },
            },
            description: {
              title: "Описание",
              placeholder:
                "Пожалуйста, опишите себя. MBTI, хобби, интересы, профессия, национальность, что вам нравится, что не нравится и т.д.",
            },
            matchSettings: {
              title: "Настройки подбора",
              gender: {
                label: "Пол для подбора",
                placeholder: "Пол для подбора",
                options: {
                  male: "Мужской",
                  female: "Женский",
                  both: "Оба",
                },
              },
              targetChatrooms: {
                label: "Количество людей для подбора",
                placeholder: "Количество людей для подбора",
              },
            },
            navigation: {
              back: "Назад",
              next: "Далее",
              finish: "Готово",
            },
          },
        },
      },
    },
  });

export default i18n;
