import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { CREDIT_PACKAGES, STRIPE_PUBLISHABLE_KEY } from "../../../config";
import { usePurchaseCreditsMutation } from "../../../slices/userSlice";
import { useRef, useState } from "react";
import { useEffect } from "react";
import LoadingScreen from "../../../components/LoadingScreen";
import PaymentDialog from "./PaymentDialog";
import { Toast } from "primereact/toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Card } from "primereact/card";

const CreditPackages: React.FC<{}> = ({}) => {
  const { t } = useTranslation();

  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  const [purchaseCredits, { isLoading, isError, isSuccess, error, data }] =
    usePurchaseCreditsMutation();

  const [paymentDialogVisible, setPaymentDialogVisible] =
    useState<boolean>(false);

  const toast = useRef<Toast>(null);

  const options = {
    clientSecret: data?.clientSecret,
    appearance: {
      theme: "stripe" as const,
    },
  };

  useEffect(() => {
    if (isSuccess) {
      setPaymentDialogVisible(true);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      toast.current?.show({
        severity: "error",
        summary: t("purchaseCreditsError"),
        detail: error?.toString(),
      });
    }
  }, [isError, t]);

  const onPaymentError = (error: any) => {
    toast.current?.show({
      severity: "error",
      summary: t("paymentError"),
      detail: error?.toString(),
    });
  };

  const onPaymentSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: t("account.payment.success"),
    });
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Toast ref={toast} />

      {data?.clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentDialog
            visible={paymentDialogVisible}
            onHide={() => {
              setPaymentDialogVisible(false);
            }}
            onSuccess={() => {
              setPaymentDialogVisible(false);
              onPaymentSuccess();
            }}
            onPaymentError={onPaymentError}
          />
        </Elements>
      )}

      <Card title={t("account.buyCredits")}>
        <div className="flex flex-col gap-2">
          {CREDIT_PACKAGES.map((pack) => (
            <Button
              key={pack.id}
              onClick={() => {
                purchaseCredits({ packageId: pack.id });
              }}
              pt={{
                label: {
                  className: "text-2xl",
                },
              }}
              label={t("account.package", {
                price: pack?.price,
                credits: pack?.credits,
              })}
              className="w-full"
            />
          ))}
        </div>
      </Card>
    </>
  );
};

export default CreditPackages;
