import React, { useState } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

interface PaymentFormProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  clientSecret,
  onSuccess,
  onError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
      });

      if (error) {
        onError(error.message || t("profile.paymentError"));
      } else {
        onSuccess();
      }
    } catch (err) {
      onError(t("profile.paymentError"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <PaymentElement />
      <div className="mt-4 flex justify-end gap-2">
        <Button
          type="submit"
          label={t("profile.pay")}
          loading={isProcessing}
          disabled={!stripe || isProcessing}
        />
      </div>
    </form>
  );
};

export default PaymentForm;
