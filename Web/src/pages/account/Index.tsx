import React, { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useThemeColor } from "../../hooks/useThemeColor";
import Content from "./Content";
import { useGetProfileQuery } from "../../slices/userSlice";
import Error from "../../components/Error";

const Home: React.FC = () => {
  useThemeColor("#FFFFFF");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    isSuccess: isProfileSuccess,
    refetch: refetchProfile,
  } = useGetProfileQuery({});

  useEffect(() => {
    if (
      isProfileSuccess &&
      (profile?.name === "" ||
        profile?.description === "" ||
        profile?.gender === "" ||
        profile?.dob === undefined)
    ) {
      navigate("/profile");
    }
  }, [profile, navigate]);

  if (isProfileError) {
    return (
      <Error onReload={refetchProfile} errorText={t("fetchProfileError")} />
    );
  }

  if (isProfileLoading) {
    return <LoadingScreen isLoading={true} />;
  }

  return <Content profile={profile} />;
};

export default Home;
