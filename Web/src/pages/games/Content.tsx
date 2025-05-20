import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BottomTab from "../../components/BottomTab";
import { Toast } from "primereact/toast";
import AppBar from "../../components/AppBar";
import Game from "./Game";

const Content: React.FC<{}> = ({}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);

  const [isNaturalOpen, setIsNaturalOpen] = useState<boolean>(false);

  if (isNaturalOpen) {
    return (
      <Game
        gameSrc="/NaturalSelectionUniversityWeb/NaturalSelectionUniversity.html"
        close={() => setIsNaturalOpen(false)}
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Toast ref={toast} />
      <AppBar>
        <h1 className="text-3xl">NookioAI</h1>
      </AppBar>

      <div className="max-w-full max-h-full overflow-y-auto p-4 flex flex-wrap gap-2">
        {!isNaturalOpen && (
          <div
            className="cursor-pointer h-fit w-fit"
            onClick={() => {
              setIsNaturalOpen(true);
            }}
          >
            <img src="/NaturalSelectionUniversityWeb/cover.png" />
          </div>
        )}
      </div>

      <BottomTab activeIndex={1} />
    </div>
  );
};

export default Content;
