import { Dialog } from "primereact/dialog";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

interface PaymentDialogProps {
  visible: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  visible,
  onHide,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
    });

    if (error) {
      console.error("Payment failed:", error);
    } else {
      onSuccess();
    }
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={t("account.payment.title")}
      style={{ width: "90vw" }}
      footer={
        <Button
          label={t("account.payment.submit")}
          onClick={handleSubmit}
          disabled={!stripe}
        />
      }
    >
      <PaymentElement />
    </Dialog>
  );
};

export default PaymentDialog;
