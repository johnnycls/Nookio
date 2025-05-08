import { Outlet, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error/Index";
import Home from "../pages/home/Index";
import Profile from "../pages/profile/Index";
import Account from "../pages/account/Index";
import Chat from "../pages/chat/Index";
import ChatDetail from "../pages/chatDetail/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> }, // chatlist
      { path: "profile", element: <Profile /> },
      { path: "account", element: <Account /> },
      { path: "chat", element: <Chat /> },
      { path: "chatdetail", element: <ChatDetail /> },
    ],
  },
]);

export default router;
