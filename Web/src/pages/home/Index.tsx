import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PromptInstallIfNotStandalone from "../../components/PromptInstallIfNotStandalone";
import { useThemeColor } from "../../hooks/useThemeColor";
import Content from "./Content";

const Home: React.FC = () => {
  useThemeColor("#FFFFFF");
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <PromptInstallIfNotStandalone>
      <>
        <LoadingScreen isLoading={false} />
        <Content />
      </>
    </PromptInstallIfNotStandalone>
  );
};

export default Home;
