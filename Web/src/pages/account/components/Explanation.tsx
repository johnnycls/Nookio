import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import { useTranslation } from "react-i18next";

const data = [
  { turn: 1, cost: 5 },
  { turn: 2, cost: 6 },
  { turn: 3, cost: 7 },
  { turn: 10, cost: 15 },
  { turn: 11, cost: 16 },
  { turn: 12, cost: 16 },
  { turn: 20, cost: 16 },
  { turn: 21, cost: 17 },
  { turn: 30, cost: 17 },
  { turn: 31, cost: 18 },
];

const Explanation: React.FC<{}> = ({}) => {
  const { t } = useTranslation();

  return (
    <Card title={t("account.explanation.title")}>
      <ul>
        <li>{t("account.explanation.explanation1")}</li>
        <li>{t("account.explanation.explanation2")}</li>
        <li>{t("account.explanation.explanation3")}</li>
        <DataTable value={data} size="small" showGridlines>
          <Column field="turn" header={t("account.explanation.turn")} />
          <Column field="cost" header={t("account.explanation.credit")} />
        </DataTable>
      </ul>
    </Card>
  );
};

export default Explanation;
