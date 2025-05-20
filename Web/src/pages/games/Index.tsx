import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useThemeColor } from "../../hooks/useThemeColor";
import Content from "./Content";

const Home: React.FC = () => {
  useThemeColor("#FFFFFF");
  const navigate = useNavigate();
  const { t } = useTranslation();

  return <Content />;
};

export default Home;
