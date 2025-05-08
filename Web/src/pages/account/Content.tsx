import React from "react";
import { profile } from "../../slices/userSlice";
import AppBar from "../../components/AppBar";
import BottomTab from "../../components/BottomTab";
import CreditPackages from "./components/CreditPackages";
import RemainingCredits from "./components/RemainingCredits";

const Content: React.FC<{ profile?: profile }> = ({ profile }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <AppBar>
        <h1 className="text-3xl">NookioAI</h1>
      </AppBar>

      <div className="w-full h-full p-6 flex flex-col gap-4">
        <RemainingCredits profile={profile} />
        <CreditPackages />
      </div>

      <BottomTab activeIndex={2} />
    </div>
  );
};

export default Content;
