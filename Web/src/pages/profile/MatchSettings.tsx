import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { profile, useUpdateProfileMutation } from "../../slices/userSlice";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { MAX_CHATROOMS } from "../../config";
import { useTranslation } from "react-i18next";
import { Toast } from "primereact/toast";
import LoadingScreen from "../../components/LoadingScreen";

const MatchSettings: React.FC<{
  prevCallback: () => void;
  nextCallback: () => void;
  profile?: profile;
}> = ({ prevCallback, nextCallback, profile }) => {
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);

  const [updateProfile, { isSuccess, isError, isLoading, error }] =
    useUpdateProfileMutation();

  const [preferedGender, setPreferedGender] = useState<
    "male" | "female" | "both"
  >(profile?.preferedGender || "both");
  const [targetChatrooms, setTargetChatrooms] = useState<number>(
    profile?.targetChatrooms || 0
  );

  const genderOptions = [
    { label: t("profile.matchSettings.gender.options.male"), value: "male" },
    {
      label: t("profile.matchSettings.gender.options.female"),
      value: "female",
    },
    { label: t("profile.matchSettings.gender.options.both"), value: "both" },
  ];

  useEffect(() => {
    if (isSuccess) {
      nextCallback();
    }
  }, [isSuccess, nextCallback]);

  useEffect(() => {
    if (isError) {
      toast.current?.show({
        severity: "error",
        summary: t("updateProfileError"),
        detail: JSON.stringify(error),
      });
    }
  }, [isError, t, error]);

  return (
    <>
      <div className="flex flex-col">
        <Toast ref={toast} />
        <LoadingScreen isLoading={isLoading} />

        <label>{t("profile.matchSettings.gender.label")}</label>
        <Dropdown
          value={preferedGender}
          onChange={(e) => setPreferedGender(e.value)}
          options={genderOptions}
          placeholder={t("profile.matchSettings.gender.placeholder")}
          className="mb-4"
        />

        <label>{t("profile.matchSettings.targetChatrooms.label")}</label>
        <InputNumber
          required
          value={targetChatrooms}
          onChange={(e) => setTargetChatrooms(e.value || 0)}
          placeholder={t("profile.matchSettings.targetChatrooms.placeholder")}
          min={0}
          max={MAX_CHATROOMS}
          showButtons
          buttonLayout="horizontal"
          className="mb-4"
          pt={{
            input: {
              root: {
                disabled: true,
                className: "w-full",
              },
            },
          }}
        />

        <div className="flex justify-between">
          <Button
            label={t("profile.navigation.back")}
            icon="pi pi-arrow-left"
            iconPos="left"
            onClick={() => {
              prevCallback();
            }}
          />
          <Button
            disabled={
              !preferedGender ||
              targetChatrooms < 0 ||
              targetChatrooms > MAX_CHATROOMS
            }
            label={t("profile.navigation.finish")}
            iconPos="right"
            icon="pi pi-arrow-right"
            onClick={() => {
              if (
                preferedGender === profile?.preferedGender &&
                targetChatrooms === profile?.targetChatrooms
              ) {
                nextCallback();
              } else {
                updateProfile({ preferedGender, targetChatrooms });
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MatchSettings;
