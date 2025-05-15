import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { PrimeReactProvider } from "primereact/api";
import LoadingScreen from "../components/LoadingScreen";
import { useGetProfileQuery } from "../slices/userSlice";
import Login from "./Login";
import PromptInstallIfNotStandalone from "../components/PromptInstallIfNotStandalone";

const App: React.FC = () => {
  const { isError, isLoading, isSuccess } = useGetProfileQuery({});

  return (
    <PrimeReactProvider>
      <PromptInstallIfNotStandalone />

      {isError ? (
        <Login />
      ) : (
        <>
          <LoadingScreen isLoading={isLoading} />
          {isSuccess && <RouterProvider router={router} />}
        </>
      )}
    </PrimeReactProvider>
  );
};

export default App;
