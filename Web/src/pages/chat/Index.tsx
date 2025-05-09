import React, { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useThemeColor } from "../../hooks/useThemeColor";
import Content from "./Content";
import { useGetProfileQuery } from "../../slices/userSlice";
import Error from "../../components/Error";
import { useLazyGetChatroomDetailQuery } from "../../slices/chatroomSlice";

const Home: React.FC = () => {
  useThemeColor("#FFFFFF");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { chatroomId } = useParams();

  const { data: profile, isLoading, isError, refetch } = useGetProfileQuery({});
  const [
    fetchChatroomDetail,
    { data: chatroom, isLoading: isChatroomLoading, isError: isChatroomError },
  ] = useLazyGetChatroomDetailQuery();

  useEffect(() => {
    if (
      profile?.name === "" ||
      profile?.description === "" ||
      profile?.gender === "" ||
      profile?.dob === undefined
    ) {
      navigate("/profile");
    }
  }, [profile, navigate]);

  useEffect(() => {
    if (chatroomId) {
      fetchChatroomDetail({ chatroomId });
    }
  }, [chatroomId, fetchChatroomDetail]);

  if (isChatroomLoading || isLoading) {
    return <LoadingScreen isLoading={true} />;
  }

  if (isChatroomError) {
    return (
      <Error
        onReload={() => {
          if (chatroomId) {
            fetchChatroomDetail({ chatroomId });
          }
        }}
        errorText={t("fetchChatroomDetailError")}
      />
    );
  }
  if (isError) {
    return <Error onReload={refetch} errorText={t("fetchProfileError")} />;
  }

  if (chatroom) {
    return <Content chatroom={chatroom} />;
  }
};

export default Home;
