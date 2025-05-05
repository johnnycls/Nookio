import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { usePurchaseCreditsMutation } from "../../slices/userSlice";

interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  label: string;
}

interface PurchaseDialogProps {
  visible: boolean;
  onHide: () => void;
}

const PurchaseDialog: React.FC<PurchaseDialogProps> = ({ visible, onHide }) => {
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);
  const [purchaseCredits] = usePurchaseCreditsMutation();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const creditPackages: CreditPackage[] = [
    {
      id: "basic",
      credits: 3000,
      price: 2.49,
      label: "2.49 USD - 3,000 Credits",
    },
    {
      id: "standard",
      credits: 8000,
      price: 4.99,
      label: "4.99 USD - 8,000 Credits",
    },
    {
      id: "premium",
      credits: 20000,
      price: 9.99,
      label: "9.99 USD - 20,000 Credits",
    },
    {
      id: "ultimate",
      credits: 50000,
      price: 19.99,
      label: "19.99 USD - 50,000 Credits",
    },
  ];

  const handlePurchase = async () => {
    if (!selectedPackage) {
      toast.current?.show({
        severity: "error",
        summary: t("profile.purchaseError"),
        detail: t("profile.selectPackage"),
      });
      return;
    }

    try {
      setIsPurchasing(true);
      const { url } = await purchaseCredits({
        packageId: selectedPackage,
      }).unwrap();
      window.location.href = url;
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: t("profile.purchaseError"),
        detail: t("profile.purchaseErrorDetail"),
      });
      setIsPurchasing(false);
    }
  };

  const footer = (
    <div>
      <Button
        label={t("common.cancel")}
        icon="pi pi-times"
        onClick={onHide}
        className="p-button-text"
        disabled={isPurchasing}
      />
      <Button
        label={t("profile.buy")}
        icon="pi pi-check"
        onClick={handlePurchase}
        loading={isPurchasing}
        autoFocus
      />
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header={t("profile.buyCredits")}
        visible={visible}
        style={{ width: "450px" }}
        footer={footer}
        onHide={onHide}
        closable={!isPurchasing}
      >
        <div className="grid gap-4">
          {creditPackages.map((pkg) => (
            <div key={pkg.id} className="flex items-center gap-2">
              <input
                type="radio"
                id={pkg.id}
                name="creditPackage"
                value={pkg.id}
                checked={selectedPackage === pkg.id}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="w-4 h-4"
                disabled={isPurchasing}
              />
              <label htmlFor={pkg.id} className="text-lg">
                {pkg.label}
              </label>
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
};

export default PurchaseDialog;
