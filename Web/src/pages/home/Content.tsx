import React, { useRef, useState } from "react";
import { profile } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppBar from "../../components/AppBar";
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

  const [
    deleteChatrooms,
    { isLoading: isDeleting, isError: isDeletingError, error: deleteError },
  ] = useDeleteChatroomMutation();

  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [selectedChatroomIds, setSelectedChatroomIds] = useState<string[]>([]);

  if (isDeleting) {
    return <LoadingScreen isLoading={true} />;
  }

  if (isDeletingError) {
    toast.current?.show({
      severity: "error",
      summary: t("deleteChatroomError"),
      detail: JSON.stringify(deleteError),
    });
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <Toast ref={toast} />
      <ConfirmDialog />

      <AppBar>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">NookioAI</h1>

          {isSelectMode && selectedChatroomIds.length > 0 && (
            <div className="flex gap-1">
              <Button
                icon="pi pi-times"
                onClick={() => {
                  setIsSelectMode(false);
                  setSelectedChatroomIds([]);
                }}
              />

              <Button
                icon="pi pi-trash"
                onClick={() => {
                  confirmDialog({
                    message: t("home.deleteChatroomConfirmation"),
                    accept: () => {
                      deleteChatrooms(selectedChatroomIds);
                    },
                    reject: () => {
                      setSelectedChatroomIds([]);
                      setIsSelectMode(false);
                    },
                  });
                }}
              />
            </div>
          )}
          {isSelectMode && selectedChatroomIds.length === 0 && (
            <Button icon="pi pi-check" onClick={() => setIsSelectMode(false)} />
          )}
          {!isSelectMode && chatrooms && chatrooms.length > 0 && (
            <Button icon="pi pi-pencil" onClick={() => setIsSelectMode(true)} />
          )}
        </div>
      </AppBar>

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
