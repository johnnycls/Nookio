import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { CREDIT_PACKAGES } from "../../../config";
import { usePurchaseCreditsMutation } from "../../../slices/userSlice";
import { useRef, useState } from "react";
import { useEffect } from "react";
import LoadingScreen from "../../../components/LoadingScreen";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import StripeElement from "./StripeElement";

const CreditPackages: React.FC<{}> = ({}) => {
  const { t } = useTranslation();

  const [purchaseCredits, { isLoading, isError, isSuccess, error, data }] =
    usePurchaseCreditsMutation();

  const [paymentDialogVisible, setPaymentDialogVisible] =
    useState<boolean>(false);

  const toast = useRef<Toast>(null);

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
      });
    }
  }, [isError, t]);

  const onPaymentError = (error: any) => {
    toast.current?.show({
      severity: "error",
      summary: t("paymentError"),
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
        <StripeElement
          clientSecret={data.clientSecret}
          paymentDialogVisible={paymentDialogVisible}
          setPaymentDialogVisible={setPaymentDialogVisible}
          onPaymentSuccess={onPaymentSuccess}
          onPaymentError={onPaymentError}
        />
      )}

      <Card title={t("account.buyCredits")}>
        <div className="flex flex-col gap-2">
          {CREDIT_PACKAGES.map((pack) => (
            <Button
              outlined
              key={pack.id}
              onClick={() => {
                purchaseCredits({ packageId: pack.id });
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
