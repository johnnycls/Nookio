import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { CREDIT_PACKAGES, STRIPE_PUBLISHABLE_KEY } from "../../../config";
import { usePurchaseCreditsMutation } from "../../../slices/userSlice";
import { useRef, useState } from "react";
import { useEffect } from "react";
import LoadingScreen from "../../../components/LoadingScreen";
import PaymentDialog from "../../../components/PaymentDialog";
import { Toast } from "primereact/toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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
        summary: t("account.buyCreditsError"),
        detail: error?.toString(),
      });
    }
  }, [isError, t]);

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
            }}
          />
        </Elements>
      )}

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
    </>
  );
};

export default CreditPackages;
