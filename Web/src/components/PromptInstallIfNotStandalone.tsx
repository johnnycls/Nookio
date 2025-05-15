import React from "react";
import PromptInstallPWAPage from "./PromptInstallPWAPage";
import useIsStandalone from "../hooks/useIsStandalone";

const PromptInstallIfNotStandalone: React.FC<{}> = ({}) => {
  const isStandalone = useIsStandalone();

  if (isStandalone === "unknown") {
    return <></>;
  }

  if (isStandalone) {
    return <></>;
  }

  return <PromptInstallPWAPage />;
};

export default PromptInstallIfNotStandalone;
