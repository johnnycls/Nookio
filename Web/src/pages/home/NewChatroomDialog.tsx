import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { useCreateChatroomMutation } from "../../slices/chatroomSlice";
import { MODELS } from "../../assets/models";
import { Dropdown } from "primereact/dropdown";
import LoadingScreen from "../../components/LoadingScreen";

const NewChatroomDialog: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const [createChatroom, { isLoading, isSuccess }] =
    useCreateChatroomMutation();
  const [selectedModel, setSelectedModel] = useState<string>(MODELS[0]._id);

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  return (
    <Dialog
      header={t("home.newChatroom.title")}
      visible={isOpen}
      onHide={() => setIsOpen(false)}
      className="w-full"
    >
      {isLoading && <LoadingScreen isLoading={isLoading} />}
      <div className="flex flex-col gap-2">
        <Dropdown
          options={MODELS.map((model) => ({
            label: model.name,
            value: model._id,
          }))}
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.value)}
        />

        <Button
          label={t("home.newChatroom.create")}
          onClick={() => {
            createChatroom({ modelId: selectedModel });
          }}
        />
      </div>
    </Dialog>
  );
};

export default NewChatroomDialog;
