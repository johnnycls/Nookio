import React from "react";
import { profile } from "../../slices/userSlice";
import AppBar from "../../components/AppBar";
import BottomTab from "../../components/BottomTab";
import CreditPackages from "./components/CreditPackages";
import RemainingCredits from "./components/RemainingCredits";
import Explanation from "./components/Explanation";
import { useTranslation } from "react-i18next";

const Content: React.FC<{ profile?: profile }> = ({ profile }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <AppBar>
        <h1 className="text-3xl">NookioAI</h1>
      </AppBar>

      <div className="w-full h-full p-6 flex flex-col gap-4 overflow-y-auto">
        <RemainingCredits profile={profile} />
        <CreditPackages />
        <Explanation />
        <p>{t("account.query")}</p>
      </div>

      <BottomTab activeIndex={3} />
    </div>
  );
};

export default Content;
