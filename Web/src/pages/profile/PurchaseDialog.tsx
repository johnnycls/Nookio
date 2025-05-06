import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { usePurchaseCreditsMutation } from "../../slices/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "../../config";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

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
  const [clientSecret, setClientSecret] = useState<string | null>(null);
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
      const { clientSecret } = await purchaseCredits({
        packageId: selectedPackage,
      }).unwrap();
      setClientSecret(clientSecret);
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: t("profile.purchaseError"),
        detail: t("profile.purchaseErrorDetail"),
      });
      setIsPurchasing(false);
    }
  };

  const handlePaymentSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: t("profile.paymentSuccess"),
      detail: t("profile.creditsAdded"),
    });
    onHide();
  };

  const handlePaymentError = (error: string) => {
    toast.current?.show({
      severity: "error",
      summary: t("profile.paymentError"),
      detail: error,
    });
  };

  const footer = !clientSecret ? (
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
  ) : null;

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header={t("profile.buyCredits")}
        visible={visible}
        style={{ width: "450px" }}
        footer={footer}
        onHide={onHide}
        closable={!isPurchasing && !clientSecret}
      >
        {!clientSecret ? (
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
        ) : (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm
              clientSecret={clientSecret}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </Elements>
        )}
      </Dialog>
    </>
  );
};

export default PurchaseDialog;
