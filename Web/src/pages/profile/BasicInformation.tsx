import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";
import { langs } from "../../assets/langs";
import { profile, useUpdateProfileMutation } from "../../slices/userSlice";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";

const BasicInformation: React.FC<{
  nextCallback: () => void;
  profile?: profile;
}> = ({ nextCallback, profile }) => {
  const [updateProfile] = useUpdateProfileMutation();
  const [name, setName] = useState<string>(profile?.name || "");
  const [gender, setGender] = useState<string>(profile?.gender || "");
  const [dob, setDob] = useState<Date>(
    profile?.dob ? new Date(profile?.dob) : new Date()
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <Dropdown
          value={langs.find((lang) => lang.code === profile?.lang)}
          onChange={(e) => updateProfile({ lang: e.value.code })}
          options={langs}
          optionLabel="nativeName"
          placeholder="Select a Language"
        />

        <InputText
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <Dropdown
          value={gender}
          onChange={(e) => setGender(e.value)}
          options={["male", "female", "other"]}
          placeholder="Gender"
        />

        <Calendar
          value={dob}
          onChange={(e) => setDob(e.value || new Date())}
          placeholder="Date of Birth"
        />

        <Button
          disabled={!name || !gender || !dob}
          label="Next"
          icon="pi pi-arrow-right"
          iconPos="right"
          onClick={() => {
            updateProfile({ name, gender, dob: dob.toISOString() });
            nextCallback();
          }}
        />
      </div>
    </>
  );
};

export default BasicInformation;
