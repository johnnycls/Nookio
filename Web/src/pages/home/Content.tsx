import React, { useRef } from "react";
import { profile } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppBar from "../../components/AppBar";
import BottomTab from "../../components/BottomTab";

const Content: React.FC<{ profile?: profile }> = ({ profile }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <AppBar>
        <h1 className="text-3xl">NookioAI</h1>
      </AppBar>

      <div className="w-full p-6 flex justify-content-center items-center"></div>

      <BottomTab activeIndex={0} />
    </div>
  );
};

export default Content;
