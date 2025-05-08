import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { profile, useUpdateProfileMutation } from "../../slices/userSlice";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { MAX_CHATROOMS } from "../../config";
import { useTranslation } from "react-i18next";

const MatchSettings: React.FC<{
  prevCallback: () => void;
  nextCallback: () => void;
  profile?: profile;
}> = ({ prevCallback, nextCallback, profile }) => {
  const { t } = useTranslation();
  const [updateProfile, { isSuccess }] = useUpdateProfileMutation();
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

  return (
    <>
      <div className="flex flex-col">
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
          value={targetChatrooms}
          onChange={(e) => setTargetChatrooms(e.value || 0)}
          placeholder={t("profile.matchSettings.targetChatrooms.placeholder")}
          min={0}
          max={MAX_CHATROOMS}
          showButtons
          buttonLayout="horizontal"
          className="mb-4"
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
              updateProfile({ preferedGender, targetChatrooms });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MatchSettings;
