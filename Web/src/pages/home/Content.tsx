import React, { useRef } from "react";
import { profile } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppBar from "../../components/AppBar";
import BottomTab from "../../components/BottomTab";
import { Chatroom } from "../../slices/chatroomSlice";

const Content: React.FC<{ profile?: profile; chatrooms?: Chatroom[] }> = ({
  profile,
  chatrooms,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <AppBar>
        <h1 className="text-3xl">NookioAI</h1>
      </AppBar>

      <div className="w-full h-full">
        {chatrooms?.map((chatroom) => (
          <div key={chatroom._id}>{chatroom.name}</div>
        ))}
      </div>

      <BottomTab activeIndex={0} />
    </div>
  );
};

export default Content;
