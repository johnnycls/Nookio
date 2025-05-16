import React, { useEffect, useRef, useState } from "react";
import { profile } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HomeAppBar from "./AppBar";
import BottomTab from "../../components/BottomTab";
import {
  Chatroom,
  useDeleteChatroomMutation,
} from "../../slices/chatroomSlice";
import ChatroomItem from "./ChatroomItem";
import { Button } from "primereact/button";
import LoadingScreen from "../../components/LoadingScreen";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const Content: React.FC<{ profile?: profile; chatrooms?: Chatroom[] }> = ({
  profile,
  chatrooms,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);

  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [selectedChatroomIds, setSelectedChatroomIds] = useState<string[]>([]);

  const [
    deleteChatrooms,
    {
      isLoading: isDeleting,
      isError: isDeletingError,
      error: deleteError,
      isSuccess: isDeletingSuccess,
    },
  ] = useDeleteChatroomMutation();

  useEffect(() => {
    if (isDeletingSuccess) {
      setSelectedChatroomIds([]);
      setIsSelectMode(false);
    }
  }, [isDeletingSuccess]);

  useEffect(() => {
    if (isDeletingError) {
      toast.current?.show({
        severity: "error",
        summary: t("deleteChatroomError"),
        detail: JSON.stringify(deleteError),
      });
    }
  }, [isDeletingError]);

  if (isDeleting) {
    return <LoadingScreen isLoading={true} />;
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <Toast ref={toast} />
      <ConfirmDialog />

      <HomeAppBar
        isSelectMode={isSelectMode}
        selectedChatroomIds={selectedChatroomIds}
        setIsSelectMode={setIsSelectMode}
        setSelectedChatroomIds={setSelectedChatroomIds}
        deleteChatrooms={deleteChatrooms}
        chatrooms={chatrooms}
        profile={profile}
      />

      <div className="w-full h-full overflow-y-auto">
        {chatrooms && chatrooms.length > 0 ? (
          chatrooms?.map((chatroom) => (
            <ChatroomItem
              key={chatroom._id}
              chatroom={chatroom}
              isSelected={selectedChatroomIds.includes(chatroom._id)}
              onClick={() => {
                if (isSelectMode) {
                  if (selectedChatroomIds.includes(chatroom._id)) {
                    setSelectedChatroomIds(
                      selectedChatroomIds.filter((id) => id !== chatroom._id)
                    );
                  } else {
                    setSelectedChatroomIds([
                      ...selectedChatroomIds,
                      chatroom._id,
                    ]);
                  }
                } else {
                  navigate(`/chat/${chatroom._id}`);
                }
              }}
            />
          ))
        ) : (
          <div className="h-full w-full p-2 text-xl">
            {t("home.noChatrooms")}
          </div>
        )}
      </div>

      <BottomTab activeIndex={0} />
    </div>
  );
};

export default Content;
