import React, { useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../slices/userSlice";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import PurchaseDialog from "./PurchaseDialog";

const Content: React.FC = () => {
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);
  const { data: profile, isLoading } = useGetProfileQuery({});
  const [updateProfile] = useUpdateProfileMutation();
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);

  const [editableProfile, setEditableProfile] = useState({
    name: "",
    description: "",
    gender: "",
    dob: undefined as Date | undefined,
    lang: "",
  });

  React.useEffect(() => {
    if (profile) {
      setEditableProfile({
        name: profile.name,
        description: profile.description,
        gender: profile.gender,
        dob: new Date(profile.dob),
        lang: profile.lang,
      });
    }
  }, [profile]);

  const genderOptions = [
    { label: t("profile.gender.male"), value: "male" },
    { label: t("profile.gender.female"), value: "female" },
    { label: t("profile.gender.other"), value: "other" },
  ];

  const languageOptions = [
    { label: "English", value: "en" },
    { label: "中文", value: "zh" },
    { label: "日本語", value: "ja" },
  ];

  const handleSave = async () => {
    try {
      await updateProfile({
        name: editableProfile.name,
        description: editableProfile.description,
        gender: editableProfile.gender,
        dob: editableProfile.dob,
        lang: editableProfile.lang,
      }).unwrap();

      toast.current?.show({
        severity: "success",
        summary: t("profile.updateSuccess"),
        detail: t("profile.updateSuccessDetail"),
      });
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: t("profile.updateError"),
        detail: t("profile.updateErrorDetail"),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        {t("common.loading")}
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4">
      <Toast ref={toast} />
      <div className="max-w-2xl mx-auto w-full bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t("profile.title")}</h1>
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold">
              {t("profile.credits")}: {profile?.credit.toLocaleString()}
            </div>
            <Button
              label={t("profile.buyCredits")}
              icon="pi pi-shopping-cart"
              onClick={() => setShowPurchaseDialog(true)}
            />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="field">
            <label htmlFor="name" className="block mb-2">
              {t("profile.name")}
            </label>
            <InputText
              id="name"
              value={editableProfile.name}
              onChange={(e) =>
                setEditableProfile({ ...editableProfile, name: e.target.value })
              }
              className="w-full"
            />
          </div>

          <div className="field">
            <label htmlFor="description" className="block mb-2">
              {t("profile.description")}
            </label>
            <InputTextarea
              id="description"
              value={editableProfile.description}
              onChange={(e) =>
                setEditableProfile({
                  ...editableProfile,
                  description: e.target.value,
                })
              }
              rows={4}
              className="w-full"
            />
          </div>

          <div className="field">
            <label htmlFor="gender" className="block mb-2">
              {t("profile.gender.title")}
            </label>
            <Dropdown
              id="gender"
              value={editableProfile.gender}
              options={genderOptions}
              onChange={(e) =>
                setEditableProfile({ ...editableProfile, gender: e.value })
              }
              className="w-full"
            />
          </div>

          <div className="field">
            <label htmlFor="dob" className="block mb-2">
              {t("profile.dob")}
            </label>
            <Calendar
              id="dob"
              value={editableProfile.dob}
              onChange={(e) =>
                setEditableProfile({
                  ...editableProfile,
                  dob: e.value || undefined,
                })
              }
              dateFormat="yy-mm-dd"
              className="w-full"
            />
          </div>

          <div className="field">
            <label htmlFor="lang" className="block mb-2">
              {t("profile.language")}
            </label>
            <Dropdown
              id="lang"
              value={editableProfile.lang}
              options={languageOptions}
              onChange={(e) =>
                setEditableProfile({ ...editableProfile, lang: e.value })
              }
              className="w-full"
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button
              label={t("profile.save")}
              icon="pi pi-save"
              onClick={handleSave}
            />
          </div>
        </div>
      </div>

      <PurchaseDialog
        visible={showPurchaseDialog}
        onHide={() => setShowPurchaseDialog(false)}
      />
    </div>
  );
};

export default Content;
