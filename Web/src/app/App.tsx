import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { PrimeReactProvider } from "primereact/api";
import useLogin from "../hooks/useLogin";
import PromptInstallIfNotStandalone from "../components/PromptInstallIfNotStandalone";
import LoadingScreen from "../components/LoadingScreen";
import Error from "../components/Error";
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  const { isLoading, isError, isSuccess } = useLogin();
  const { t } = useTranslation();

  return (
    <PrimeReactProvider>
      <PromptInstallIfNotStandalone>
        {isError ? (
          <Error
            errorText={t("loginError")}
            onReload={() => {
              window.location.reload();
            }}
          />
        ) : (
          <>
            <LoadingScreen isLoading={isLoading} />
            {isSuccess && <RouterProvider router={router} />}
          </>
        )}
      </PromptInstallIfNotStandalone>
    </PrimeReactProvider>
  );
};

export default App;
