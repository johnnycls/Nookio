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
import i18next from "i18next";
import { NAME_LENGTH_LIMIT } from "../../config";

const BasicInformation: React.FC<{
  nextCallback: () => void;
  profile?: profile;
}> = ({ nextCallback, profile }) => {
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);

  const [updateProfile, { isLoading, isError, isSuccess, error }] =
    useUpdateProfileMutation();

  const [lang, setLang] = useState<string>(profile?.lang || "");
  const [name, setName] = useState<string>(profile?.name || "");
  const [gender, setGender] = useState<string>(profile?.gender || "");
  const [dob, setDob] = useState<string>(profile?.dob || "");

  useEffect(() => {
    if (profile?.lang) {
      setLang(profile.lang);
    }
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

  const genderOptions = [
    { label: t("profile.basicInfo.gender.options.male"), value: "male" },
    { label: t("profile.basicInfo.gender.options.female"), value: "female" },
    { label: t("profile.basicInfo.gender.options.other"), value: "other" },
  ];

  return (
    <>
      <div className="flex flex-col gap-2">
        <Toast ref={toast} />
        <LoadingScreen isLoading={isLoading} />

        <div className="flex flex-col">
          <label htmlFor="language" className="text-sm">
            {t("profile.basicInfo.language.label")}
          </label>
          <Dropdown
            value={langs.find((_lang) => _lang.code === lang)}
            onChange={(e) => {
              i18next.changeLanguage(e.value.code);
              setLang(e.value.code);
            }}
            options={langs}
            optionLabel="nativeName"
            placeholder={t("profile.basicInfo.language.placeholder")}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm">
            {t("profile.basicInfo.name.label")}
          </label>
          <InputText
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("profile.basicInfo.name.placeholder")}
            maxLength={NAME_LENGTH_LIMIT}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="gender" className="text-sm">
            {t("profile.basicInfo.gender.label")}
          </label>
          <Dropdown
            value={gender}
            onChange={(e) => setGender(e.value)}
            options={genderOptions}
            placeholder={t("profile.basicInfo.gender.placeholder")}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="dob" className="text-sm">
            {t("profile.basicInfo.dob.label")}
          </label>
          <Calendar
            value={new Date(dob)}
            onChange={(e) =>
              setDob(e.value?.toISOString() || new Date().toISOString())
            }
            placeholder={t("profile.basicInfo.dob.placeholder")}
          />
        </div>

        <Button
          disabled={!name || !gender || !dob || isLoading}
          label={t("profile.navigation.next")}
          icon="pi pi-arrow-right"
          iconPos="right"
          onClick={() => {
            if (
              lang === profile?.lang &&
              name === profile?.name &&
              gender === profile?.gender &&
              dob === profile?.dob
            ) {
              nextCallback();
            } else {
              updateProfile({ lang, name, gender, dob });
            }
          }}
        />
      </div>
    </>
  );
};

export default BasicInformation;
