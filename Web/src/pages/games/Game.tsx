import { Button } from "primereact/button";
import React from "react";

const Game: React.FC<{ gameSrc: string; close: () => void }> = ({
  gameSrc,
  close,
}) => {
  return (
    <>
      <iframe src={gameSrc} className="w-full h-full" />
      <Button
        className="!fixed !right-2 !top-2"
        text
        icon="pi pi-times"
        onClick={close}
      />
    </>
  );
};

export default Game;
