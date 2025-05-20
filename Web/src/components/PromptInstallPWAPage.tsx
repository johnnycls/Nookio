import React, { useState } from "react";
import usePlatform, { Platform } from "../hooks/usePlatform";
import { useTranslation } from "react-i18next";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

interface Instruction {
  title: string;
  steps: string[];
}

const PromptInstallPWAPage: React.FC = () => {
  const platform = usePlatform();
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);

  const instructions: Record<Platform, Instruction> = {
    windows: {
      title: t("install.windows.title"),
      steps: [
        t("install.windows.1"),
        t("install.windows.2"),
        t("install.windows.3"),
      ],
    },
    mac: {
      title: t("install.mac.title"),
      steps: [
        t("install.mac.1"),
        t("install.mac.2"),
        t("install.mac.3"),
        t("install.mac.4"),
      ],
    },
    ios: {
      title: t("install.ios.title"),
      steps: [
        t("install.ios.1"),
        t("install.ios.2"),
        t("install.ios.3"),
        t("install.ios.4"),
      ],
    },
    android: {
      title: t("install.android.title"),
      steps: [
        t("install.android.1"),
        t("install.android.2"),
        t("install.android.3"),
      ],
    },
    unknown: {
      title: t("install.unknown.title"),
      steps: [
        t("install.unknown.1"),
        t("install.unknown.2"),
        t("install.unknown.3"),
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
    <>
      <Dialog
        closable
        visible={visible}
        onHide={() => setVisible(false)}
        header={currentInstructions.title}
        closeIcon="pi pi-times"
      >
        <ul className="space-y-6">
          {currentInstructions.steps.map((step, index) => (
            <li key={index}>
              <div className="flex items-center">
                <span
                  className="flex items-center justify-center text-white rounded-full w-8 h-8 mr-4 flex-shrink-0 text-sm font-bold"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="" style={{ color: colors.lightText }}>
                    {step}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Dialog>

      <Button
        icon="pi pi-download"
        onClick={() => {
          setVisible(true);
        }}
      />
    </>
  );
};

export default PromptInstallPWAPage;
