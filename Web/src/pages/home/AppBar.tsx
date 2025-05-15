import React, { useState } from "react";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { useTranslation } from "react-i18next";
import { Chatroom } from "../../slices/chatroomSlice";
import AppBar from "../../components/AppBar";
import NewChatroomDialog from "./NewChatroomDialog";
interface HomeAppBarProps {
  isSelectMode: boolean;
  selectedChatroomIds: string[];
  setIsSelectMode: (value: boolean) => void;
  setSelectedChatroomIds: (ids: string[]) => void;
  deleteChatrooms: (ids: string[]) => void;
  chatrooms?: Chatroom[];
}

const HomeAppBar: React.FC<HomeAppBarProps> = ({
  isSelectMode,
  selectedChatroomIds,
  setIsSelectMode,
  setSelectedChatroomIds,
  deleteChatrooms,
  chatrooms,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <AppBar>
      <NewChatroomDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl">NookioAI</h1>

        <div className="flex gap-1">
          {!isSelectMode && (
            <Button icon="pi pi-plus" onClick={() => setIsOpen(true)} />
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
