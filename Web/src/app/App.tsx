import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { PrimeReactProvider } from "primereact/api";
import { useAppDispatch } from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "../config";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <PrimeReactProvider>
        <RouterProvider router={router} />
      </PrimeReactProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
