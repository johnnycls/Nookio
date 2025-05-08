import React from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useThemeColor } from "../../hooks/useThemeColor";
import Content from "./Content";
import { useGetProfileQuery } from "../../slices/userSlice";
import Error from "../../components/Error";

const Profile: React.FC = () => {
  useThemeColor("#FFFFFF");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: profile, isLoading, isError, refetch } = useGetProfileQuery({});

  return isError ? (
    <Error onReload={refetch} errorText={t("error.error")} />
  ) : (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Content profile={profile} />
    </>
  );
};

export default Profile;
