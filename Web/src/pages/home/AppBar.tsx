import React, { useState } from "react";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { useTranslation } from "react-i18next";
import { Chatroom } from "../../slices/chatroomSlice";
import AppBar from "../../components/AppBar";
import NewChatroomDialog from "./NewChatroomDialog";
import { MAX_CHATROOMS, MIN_CREDITS_FOR_AUTO_CHAT } from "../../config";
import { profile } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

interface HomeAppBarProps {
  isSelectMode: boolean;
  selectedChatroomIds: string[];
  setIsSelectMode: (value: boolean) => void;
  setSelectedChatroomIds: (ids: string[]) => void;
  deleteChatrooms: (ids: string[]) => void;
  chatrooms?: Chatroom[];
  profile?: profile;
}

const HomeAppBar: React.FC<HomeAppBarProps> = ({
  isSelectMode,
  selectedChatroomIds,
  setIsSelectMode,
  setSelectedChatroomIds,
  deleteChatrooms,
  chatrooms,
  profile,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const existingModelIds =
    chatrooms?.map((chatroom) => chatroom.model._id) ?? [];

  return (
    <AppBar>
      <NewChatroomDialog
        userLang={profile?.lang}
        existingModelIds={existingModelIds}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl">NookioAI</h1>

        <div className="flex gap-1">
          {!isSelectMode && (
            <Button
              icon="pi pi-plus"
              disabled={!chatrooms || chatrooms.length >= MAX_CHATROOMS}
              onClick={() => {
                if (profile && profile.credit < MIN_CREDITS_FOR_AUTO_CHAT) {
                  navigate("/account");
                } else {
                  setIsOpen(true);
                }
              }}
            />
          )}

          {isSelectMode && selectedChatroomIds.length > 0 && (
            <>
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
            </>
          )}

          {isSelectMode && selectedChatroomIds.length === 0 && (
            <Button icon="pi pi-check" onClick={() => setIsSelectMode(false)} />
          )}

          {!isSelectMode && chatrooms && chatrooms.length > 0 && (
            <Button icon="pi pi-pencil" onClick={() => setIsSelectMode(true)} />
          )}
        </div>
      </div>
    </AppBar>
  );
};

export default HomeAppBar;
