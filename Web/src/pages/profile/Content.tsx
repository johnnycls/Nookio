import React, { useRef } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import BasicInformation from "./BasicInformation";
import { Card } from "primereact/card";
import { profile } from "../../slices/userSlice";
import MatchSettings from "./MatchSettings";
import Description from "./Description";
const Content: React.FC<{ profile?: profile }> = ({ profile }) => {
  const stepperRef = useRef<Stepper>(null);

  return (
    <div className="w-full h-full p-6 flex justify-content-center items-center">
      <Card className="w-full p-6" title="Profile">
        <Stepper ref={stepperRef}>
          <StepperPanel header="Basic Information">
            <BasicInformation
              nextCallback={() => {
                stepperRef.current?.nextCallback();
              }}
              profile={profile}
            />
          </StepperPanel>
          <StepperPanel header="Description">
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
          <StepperPanel header="Match Settings">
            <MatchSettings
              prevCallback={() => {
                stepperRef.current?.prevCallback();
              }}
              nextCallback={() => {
                stepperRef.current?.nextCallback();
              }}
              profile={profile}
            />
          </StepperPanel>
        </Stepper>
      </Card>
    </div>
  );
};

export default Content;
