import React from "react";
import { Button } from "primereact/button";

const OptionButton: React.FC<{
  option: string;
  onClick: () => void;
  disabled: boolean;
}> = ({ disabled, option, onClick }) => {
  return (
    <div className={"w-full flex items-center justify-center"}>
      <Button
        disabled={disabled}
        outlined
        className="!bg-white w-[90%] !border-2"
        label={option}
        onClick={onClick}
      />
    </div>
  );
};

export default OptionButton;
