import { Outlet, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [],
  },
]);

export default router;
