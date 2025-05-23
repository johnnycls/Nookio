import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { useCreateChatroomMutation } from "../../slices/chatroomSlice";
import { MODELS, Model, SERIES } from "../../assets/models";
import { Dropdown } from "primereact/dropdown";
import LoadingScreen from "../../components/LoadingScreen";
import { langs } from "../../assets/langs";
import { hasIntersection } from "../../utils/general";
import { Toast } from "primereact/toast";

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

function matchSerie(model: Model, serieId: string) {
  if (serieId === "all") return true;
  return model.series.includes(serieId);
}

const NewChatroomDialog: React.FC<{
  userLang?: string;
  existingModelIds: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ userLang, existingModelIds, isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);
  const [createChatroom, { isLoading, isSuccess, isError, error }] =
    useCreateChatroomMutation();

  const [selectedLang, setSelectedLang] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<
    "male" | "female" | "both"
  >("both");
  const [selectedSerieId, setSelectedSerieId] = useState<string>("all");

  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  const options = MODELS.filter(
    (model) =>
      (!existingModelIds.includes(model._id) ||
        hasIntersection(model.series, ["004", "005", "006"])) &&
      matchLang(model, selectedLang) &&
      matchGender(model, selectedGender) &&
      matchSerie(model, selectedSerieId)
  );
  const serieIdOptions = [
    "all",
    ...SERIES.filter((serie) => {
      return selectedLang === "all" || serie.langs.includes(selectedLang);
    }).map((serie) => serie._id),
  ];

  useEffect(() => {
    if (isError) {
      toast.current?.show({
        severity: "error",
        summary: t("createChatroomError"),
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (options.find((option) => option._id === selectedModel?._id)) {
      return;
    }
    if (options.length > 0) {
      setSelectedModel(options[0]);
    } else {
      setSelectedModel(null);
    }
  }, [options]);

  useEffect(() => {
    if (selectedSerieId === "all") return;

    if (serieIdOptions.includes(selectedSerieId)) return;

    setSelectedSerieId("all");
  }, [serieIdOptions]);

  useEffect(() => {
    console.log("userLang", userLang);
    if (userLang && langs.find((lang) => lang.code === userLang)) {
      setSelectedLang(userLang);
    }
  }, [userLang]);

  const modelTemplate = (option: Model) => {
    if (!option) return <></>;

    return (
      <div className="flex items-center gap-2">
        <img
          alt={option.name}
          src={`/avatars/${option._id}.jpg`}
          className="w-8 h-8 rounded-full"
        />
        <div>{option.name}</div>
      </div>
    );
  };

  const serieTemplate = (serieId: string) => {
    if (serieId === "all") {
      return <div>{t("home.newChatroom.allSeries")}</div>;
    }

    const serie = SERIES.find((s) => s._id === serieId);
    if (!serie) return <></>;

    return <div>{serie.label}</div>;
  };

  return (
    <Dialog
      header={t("home.newChatroom.title")}
      visible={isOpen}
      onHide={() => setIsOpen(false)}
      className="w-full"
    >
      <Toast ref={toast} />
      {isLoading && <LoadingScreen isLoading={isLoading} />}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          {/* <Dropdown
            pt={{
              input: {
                className: "!pr-0",
              },
            }}
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
            }}
          /> */}
          {/* <Dropdown
            pt={{
              input: {
                className: "!pr-0",
              },
            }}
            options={[
              { label: t("home.newChatroom.male"), value: "male" },
              { label: t("home.newChatroom.female"), value: "female" },
              { label: t("home.newChatroom.both"), value: "both" },
            ]}
            value={selectedGender}
            onChange={(e) => {
              setSelectedGender(e.value);
            }}
          /> */}

          <Dropdown
            pt={{
              input: {
                className: "!pr-0",
              },
            }}
            options={serieIdOptions}
            value={selectedSerieId}
            onChange={(e) => {
              setSelectedSerieId(e.value);
            }}
            itemTemplate={serieTemplate}
            valueTemplate={serieTemplate}
          />
        </div>

        {options.length > 0 ? (
          <>
            <Dropdown
              options={options}
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
                if (selectedModel) {
                  createChatroom({ modelId: selectedModel._id });
                }
              }}
            />
          </>
        ) : (
          <p>{t("home.newChatroom.noOptions")}</p>
        )}
      </div>
    </Dialog>
  );
};

export default NewChatroomDialog;
