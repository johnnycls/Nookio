import { useState } from "react";
import { usePurchaseCreditsMutation } from "../slices/userSlice";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";

export const usePayment = (toast: React.RefObject<Toast>) => {
  const { t } = useTranslation();
  const [purchaseCredits] = usePurchaseCreditsMutation();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>("");

  const handlePurchase = async (packageId: string) => {
    try {
      const response = await purchaseCredits({ packageId }).unwrap();
      setClientSecret(response.clientSecret);
      setShowPaymentDialog(true);
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: t("account.buyCreditsError"),
        detail: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentDialog(false);
    setClientSecret("");
    toast.current?.show({
      severity: "success",
      summary: t("account.payment.success"),
    });
  };

  const handlePaymentError = () => {
    toast.current?.show({
      severity: "error",
      summary: t("account.payment.error"),
    });
  };

  return {
    showPaymentDialog,
    setShowPaymentDialog,
    clientSecret,
    handlePurchase,
    handlePaymentSuccess,
    handlePaymentError,
  };
};
