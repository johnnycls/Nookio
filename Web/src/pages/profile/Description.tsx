import { Button } from "primereact/button";
import React, { useState } from "react";
import { profile, useUpdateProfileMutation } from "../../slices/userSlice";
import { InputTextarea } from "primereact/inputtextarea";
import { useTranslation } from "react-i18next";

const Description: React.FC<{
  prevCallback: () => void;
  nextCallback: () => void;
  profile?: profile;
}> = ({ prevCallback, nextCallback, profile }) => {
  const { t } = useTranslation();
  const [updateProfile] = useUpdateProfileMutation();
  const [description, setDescription] = useState<string>(
    profile?.description || ""
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <InputTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          autoResize
          placeholder={t("profile.description.placeholder")}
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
            disabled={!description}
            label={t("profile.navigation.next")}
            iconPos="right"
            icon="pi pi-arrow-right"
            onClick={() => {
              updateProfile({ description });
              nextCallback();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Description;
