import { Button } from "primereact/button";
import React, { useState } from "react";
import { profile, useUpdateProfileMutation } from "../../slices/userSlice";
import { InputTextarea } from "primereact/inputtextarea";

const Description: React.FC<{
  prevCallback: () => void;
  nextCallback: () => void;
  profile?: profile;
}> = ({ prevCallback, nextCallback, profile }) => {
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
          placeholder="Please describe yourself. MBTI, hobbies, interests, occupation, nationality, things you like, things you dislike, etc."
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
            disabled={!description}
            label="Next"
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
