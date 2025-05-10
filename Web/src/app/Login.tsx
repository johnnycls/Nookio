import React from "react";
import useLogin from "../hooks/useLogin";
import Error from "../components/Error";
import { useTranslation } from "react-i18next";
import LoadingScreen from "../components/LoadingScreen";

const Login: React.FC<{}> = ({}) => {
  const { isLoading, isError } = useLogin();
  const { t } = useTranslation();

  return isError ? (
    <Error
      errorText={t("loginError")}
      onReload={() => {
        window.location.reload();
      }}
    />
  ) : (
    <>
      <LoadingScreen isLoading={isLoading} />
    </>
  );
};

export default Login;
