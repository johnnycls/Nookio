import React from "react";
import { useThemeColor } from "../../hooks/useThemeColor";
import Content from "./Content";
import AppBar from "../../components/AppBar";

const Profile: React.FC = () => {
  useThemeColor("#FFFFFF");

  return (
    <div className="w-full h-full flex flex-col">
      <AppBar />
      <Content />
    </div>
  );
};

export default Profile;
