import { useTranslation } from "react-i18next";
import { profile } from "../../../slices/userSlice";
import { Card } from "primereact/card";

const RemainingCredits: React.FC<{ profile?: profile }> = ({ profile }) => {
  const { t } = useTranslation();

  return (
    <Card className="w-full py-2">
      <div className="flex justify-between items-center">
        <span className="text-xl">{t("account.remainingCredit")}</span>
        <span className="text-2xl">{profile?.credit}</span>
      </div>
    </Card>
  );
};

export default RemainingCredits;
