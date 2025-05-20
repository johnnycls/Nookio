import React from "react";
import { useNavigate } from "react-router-dom";
import { TabMenu } from "primereact/tabmenu";

const BottomTab: React.FC<{ activeIndex: number }> = ({ activeIndex }) => {
  const navigate = useNavigate();

  const items = [
    { label: "", icon: "pi pi-home", command: () => navigate("/") },
    { label: "", icon: "pi pi-box", command: () => navigate("/games") },
    { label: "", icon: "pi pi-user", command: () => navigate("/profile") },
    { label: "", icon: "pi pi-wallet", command: () => navigate("/account") },
  ];

  return (
    <div className="w-full flex mt-auto">
      <TabMenu
        className="w-full"
        pt={{
          menu: { className: "justify-between" },
          icon: { className: "!text-xl" },
        }}
        model={items}
        activeIndex={activeIndex}
      />
    </div>
  );
};

export default BottomTab;
