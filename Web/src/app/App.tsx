import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { PrimeReactProvider } from "primereact/api";
import { useAppDispatch } from "./store";
import useLogin from "../hooks/useLogin";
import PromptInstallIfNotStandalone from "../components/PromptInstallIfNotStandalone";
import LoadingScreen from "../components/LoadingScreen";
import Error from "../components/Error";
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError, isSuccess } = useLogin();
  const { t } = useTranslation();

  return (
    <PromptInstallIfNotStandalone>
      <PrimeReactProvider>
        {isError ? (
          <Error onReload={() => {}} errorText={t("error.error")} />
        ) : (
          <>
            <LoadingScreen isLoading={isLoading} />
            {isSuccess && <RouterProvider router={router} />}
          </>
        )}
      </PrimeReactProvider>
    </PromptInstallIfNotStandalone>
  );
};

export default App;
