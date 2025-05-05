import { Outlet, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error/Index";
import Home from "../pages/home/Index";
import Profile from "../pages/profile/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

export default router;
