import React from "react";
import usePlatform, { Platform } from "../hooks/usePlatform";

interface InstructionStep {
  en: string;
  zh: string;
}

interface Instruction {
  title: {
    en: string;
    zh: string;
  };
  steps: InstructionStep[];
}

const PromptInstallPWAPage: React.FC = () => {
  const platform = usePlatform();

  const instructions: Record<Platform, Instruction> = {
    windows: {
      title: {
        en: "Install Nookio on Windows",
        zh: "在Windows上安裝Nookio",
      },
      steps: [
        {
          en: "It's recommended to open this page with Google Chrome (Better user experience using mobile phone)",
          zh: "我們建議使用Google Chrome瀏覽這頁面（使用手機瀏覽體驗會更佳）",
        },
        {
          en: "Click on the install button at the right of the address bar",
          zh: "點擊網址列右面的下載按鈕",
        },
        {
          en: 'Click "Install" in the pop-up window',
          zh: '在彈出視窗中點擊"安裝"',
        },
      ],
    },
    mac: {
      title: {
        en: "Install Nookio on Mac",
        zh: "在Mac上安裝Nookio",
      },
      steps: [
        {
          en: "It's recommended to open this page with Google Chrome (Better user experience using mobile phone)",
          zh: "我們建議使用Google Chrome瀏覽這頁面（使用手機瀏覽體驗會更佳）",
        },
        {
          en: 'Click on the "..." menu in the top-right corner',
          zh: '點擊右上角的"..."選單',
        },
        {
          en: 'Select "Install Nookio..." from the menu',
          zh: '選擇"安裝Nookio"',
        },
        {
          en: 'Click "Install" in the pop-up window',
          zh: '在彈出視窗中點擊"安裝"',
        },
      ],
    },
    ios: {
      title: {
        en: "Install Nookio on iOS",
        zh: "在iOS上安裝Nookio",
      },
      steps: [
        {
          en: "It's recommended to open this page with Google Chrome",
          zh: "我們建議使用Google Chrome瀏覽這頁面",
        },
        { en: "Tap the Share button", zh: "點擊分享按鈕" },
        {
          en: 'Scroll down and tap "Add to Home Screen"',
          zh: '向下滾動並點擊"加到主畫面"',
        },
        { en: 'Tap "Add" in the top-right corner', zh: '點擊右上角的"加入"' },
      ],
    },
    android: {
      title: {
        en: "Install Nookio on Android",
        zh: "在Android上安裝Nookio",
      },
      steps: [
        {
          en: "It's recommended to open this page with Google Chrome",
          zh: "我們建議使用Google Chrome瀏覽這頁面",
        },
        {
          en: 'Tap the "..." menu (if install button is not popped up)',
          zh: '點擊"..."選單 （如沒有彈出安裝提示）',
        },
        {
          en: 'Tap "Install app" or "Add to Home screen"',
          zh: '點擊"安裝應用程式"或"新增至主螢幕"',
        },
        {
          en: 'Tap "Install" or "Add" in the pop-up',
          zh: '在彈出視窗中點擊"安裝"或"新增"',
        },
      ],
    },
    unknown: {
      title: {
        en: "Installation Instructions",
        zh: "安裝說明",
      },
      steps: [
        {
          en: "It's recommended to open this page with Google Chrome (Better user experience using mobile phone)",
          zh: "我們建議使用Google Chrome瀏覽這頁面（使用手機瀏覽體驗會更佳）",
        },
        {
          en: "Look for an 'Install' or 'Add to Home Screen' option in your browser's menu",
          zh: "在瀏覽器選單中尋找「安裝」或「加到主畫面」選項",
        },
        {
          en: "Follow the prompts to install the app",
          zh: "按照提示安裝應用程式",
        },
      ],
    },
  };

  const currentInstructions = instructions[platform];
  const colors = {
    secondary: "#ffcc00",
    text: "#333333",
    lightText: "#666666",
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1
          className="text-4xl font-light text-center mb-8"
          style={{ color: "var(--primary-color)" }}
        >
          <span className="block">{currentInstructions.title.en}</span>
          <span
            className="block mt-2 text-xl"
            style={{ color: colors.lightText }}
          >
            {currentInstructions.title.zh}
          </span>
        </h1>
        <ul className="space-y-6">
          {currentInstructions.steps.map((step, index) => (
            <li key={index}>
              <div className="flex items-start">
                <span
                  className="flex items-center justify-center text-white rounded-full w-8 h-8 mr-4 flex-shrink-0 text-sm font-bold"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="text-lg mb-1" style={{ color: colors.text }}>
                    {step.en}
                  </p>
                  <p className="text-sm" style={{ color: colors.lightText }}>
                    {step.zh}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PromptInstallPWAPage;
