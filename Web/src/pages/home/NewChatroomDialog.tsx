import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { useCreateChatroomMutation } from "../../slices/chatroomSlice";
import { MODELS, Model } from "../../assets/models";
import { Dropdown } from "primereact/dropdown";
import LoadingScreen from "../../components/LoadingScreen";
import { langs } from "../../assets/langs";

function matchLang(model: Model, lang: string) {
  if (lang === "all") return true;
  return model.languages.includes(lang);
}

function matchGender(model: Model, gender: "male" | "female" | "both") {
  if (gender === "both") return true;
  if (gender === "male") return model.gender === "male";
  if (gender === "female") return model.gender === "female";
  return false;
}

const NewChatroomDialog: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const [createChatroom, { isLoading, isSuccess }] =
    useCreateChatroomMutation();

  const [selectedLang, setSelectedLang] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<
    "male" | "female" | "both"
  >("both");
  const [selectedModel, setSelectedModel] = useState<Model | null>(MODELS[0]);

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  const modelTemplate = (option: Model) => {
    if (!option) return <></>;

    return (
      <div className="flex items-center gap-2">
        <img
          alt={option.name}
          src={option.avatar}
          className="w-8 h-8 rounded-full"
        />
        <div>{option.name}</div>
      </div>
    );
  };

  return (
    <Dialog
      header={t("home.newChatroom.title")}
      visible={isOpen}
      onHide={() => setIsOpen(false)}
      className="w-full"
    >
      {isLoading && <LoadingScreen isLoading={isLoading} />}
      <div className="flex flex-col gap-2">
        {/* <div className="flex gap-2 flex-wrap">
          <Dropdown
            options={[
              { label: t("home.newChatroom.allLangs"), value: "all" },
              ...langs.map((lang) => ({
                label: lang.nativeName,
                value: lang.code,
              })),
            ]}
            value={selectedLang}
            onChange={(e) => {
              setSelectedLang(e.value);

              if (!selectedModel || !matchLang(selectedModel, e.value)) {
                setSelectedModel(null);
              }
            }}
          />
          <Dropdown
            options={[
              { label: t("home.newChatroom.male"), value: "male" },
              { label: t("home.newChatroom.female"), value: "female" },
              { label: t("home.newChatroom.both"), value: "both" },
            ]}
            value={selectedGender}
            onChange={(e) => {
              setSelectedGender(e.value);

              if (!selectedModel || !matchGender(selectedModel, e.value)) {
                setSelectedModel(null);
              }
            }}
          />
        </div> */}

        <Dropdown
          options={MODELS.filter(
            (model) =>
              matchLang(model, selectedLang) &&
              matchGender(model, selectedGender)
          )}
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.value)}
          optionLabel="name"
          itemTemplate={modelTemplate}
          valueTemplate={modelTemplate}
        />

        <Button
          label={t("home.newChatroom.create")}
          disabled={!selectedModel}
          onClick={() => {
            if (!selectedModel) return;
            createChatroom({ modelId: selectedModel._id });
          }}
        />
      </div>
    </Dialog>
  );
};

export default NewChatroomDialog;
