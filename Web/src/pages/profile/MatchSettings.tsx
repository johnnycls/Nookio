import { Button } from "primereact/button";
import React, { useState } from "react";
import { profile, useUpdateProfileMutation } from "../../slices/userSlice";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { MAX_CHATROOMS } from "../../config";

const MatchSettings: React.FC<{
  prevCallback: () => void;
  nextCallback: () => void;
  profile?: profile;
}> = ({ prevCallback, nextCallback, profile }) => {
  const [updateProfile] = useUpdateProfileMutation();
  const [preferedGender, setPreferedGender] = useState<
    "male" | "female" | "both"
  >(profile?.preferedGender || "both");
  const [targetChatrooms, setTargetChatrooms] = useState<number>(
    profile?.targetChatrooms || 0
  );

  return (
    <>
      <div className="flex flex-col">
        <label>Match Gender</label>
        <Dropdown
          value={preferedGender}
          onChange={(e) => setPreferedGender(e.value)}
          options={["male", "female", "both"]}
          placeholder="Match Gender"
          className="mb-4"
        />

        <label>Number of People to Match</label>
        <InputNumber
          value={targetChatrooms}
          onChange={(e) => setTargetChatrooms(e.value || 0)}
          placeholder="Number of People to Match"
          min={0}
          max={MAX_CHATROOMS}
          showButtons
          buttonLayout="horizontal"
          className="mb-4"
        />

        <div className="flex justify-between">
          <Button
            label="Back"
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
            label="Finish"
            iconPos="right"
            icon="pi pi-arrow-right"
            onClick={() => {
              updateProfile({ preferedGender, targetChatrooms });
              nextCallback();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MatchSettings;
