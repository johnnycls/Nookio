import React, { useRef } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import BasicInformation from "./BasicInformation";
import { Card } from "primereact/card";
import { profile } from "../../slices/userSlice";
import MatchSettings from "./MatchSettings";
import Description from "./Description";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppBar from "../../components/AppBar";
import BottomTab from "../../components/BottomTab";

const Content: React.FC<{ profile?: profile }> = ({ profile }) => {
  const stepperRef = useRef<Stepper>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <AppBar>
        <h1 className="text-3xl">NookioAI</h1>
      </AppBar>

      <div className="w-full p-6 flex justify-content-center items-center">
        <Card className="w-full p-4" title={t("profile.title")}>
          <Stepper ref={stepperRef}>
            <StepperPanel header={t("profile.basicInfo.title")}>
              <BasicInformation
                nextCallback={() => {
                  stepperRef.current?.nextCallback();
                }}
                profile={profile}
              />
            </StepperPanel>
            <StepperPanel header={t("profile.description.title")}>
              <Description
                prevCallback={() => {
                  stepperRef.current?.prevCallback();
                }}
                nextCallback={() => {
                  stepperRef.current?.nextCallback();
                }}
                profile={profile}
              />
            </StepperPanel>
            <StepperPanel header={t("profile.matchSettings.title")}>
              <MatchSettings
                prevCallback={() => {
                  stepperRef.current?.prevCallback();
                }}
                nextCallback={() => {
                  navigate("/");
                }}
                profile={profile}
              />
            </StepperPanel>
          </Stepper>
        </Card>
      </div>

      {profile?.name &&
        profile?.description &&
        profile?.gender &&
        profile?.dob && <BottomTab activeIndex={1} />}
    </div>
  );
};

export default Content;
