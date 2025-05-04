import { Outlet, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error/Error";
import Home from "../pages/home/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [{ path: "", element: <Home /> }],
  },
]);

export default router;
