import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useRef, useState } from "react";
import { langs } from "../../assets/langs";
import { profile, useUpdateProfileMutation } from "../../slices/userSlice";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { useTranslation } from "react-i18next";
import { Toast } from "primereact/toast";
import LoadingScreen from "../../components/LoadingScreen";

const BasicInformation: React.FC<{
  nextCallback: () => void;
  profile?: profile;
}> = ({ nextCallback, profile }) => {
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);

  const [updateProfile, { isLoading, isError }] = useUpdateProfileMutation();
  const [name, setName] = useState<string>(profile?.name || "");
  const [gender, setGender] = useState<string>(profile?.gender || "");
  const [dob, setDob] = useState<string>(profile?.dob || "");

  useEffect(() => {
    if (profile?.gender) {
      setGender(profile.gender);
    }
    if (profile?.name) {
      setName(profile.name);
    }
    if (profile?.dob) {
      setDob(profile.dob);
    }
  }, [profile]);

  useEffect(() => {
    if (isError) {
      toast.current?.show({
        severity: "error",
        summary: t("profile.error.title"),
        detail: t("profile.error.message"),
      });
    }
  }, [isError, t]);

  const genderOptions = [
    { label: t("profile.basicInfo.gender.options.male"), value: "male" },
    { label: t("profile.basicInfo.gender.options.female"), value: "female" },
    { label: t("profile.basicInfo.gender.options.other"), value: "other" },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <LoadingScreen isLoading={isLoading} />
        <Dropdown
          value={langs.find((lang) => lang.code === profile?.lang)}
          onChange={(e) => updateProfile({ lang: e.value.code })}
          options={langs}
          optionLabel="nativeName"
          placeholder={t("profile.basicInfo.language.placeholder")}
        />

        <InputText
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("profile.basicInfo.name.placeholder")}
        />

        <Dropdown
          value={gender}
          onChange={(e) => setGender(e.value)}
          options={genderOptions}
          placeholder={t("profile.basicInfo.gender.placeholder")}
        />

        <Calendar
          value={new Date(dob)}
          onChange={(e) =>
            setDob(e.value?.toISOString() || new Date().toISOString())
          }
          placeholder={t("profile.basicInfo.dob.placeholder")}
        />

        <Button
          disabled={!name || !gender || !dob || isLoading}
          label={t("profile.navigation.next")}
          icon="pi pi-arrow-right"
          iconPos="right"
          onClick={() => {
            updateProfile({ name, gender, dob });
            nextCallback();
          }}
        />
      </div>
    </>
  );
};

export default BasicInformation;
