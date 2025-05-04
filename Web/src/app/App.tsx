import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { PrimeReactProvider } from "primereact/api";
import { useAppDispatch } from "./store";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  );
};

export default App;
