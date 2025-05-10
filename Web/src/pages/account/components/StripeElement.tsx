import { STRIPE_PUBLISHABLE_KEY } from "../../../config";
import PaymentDialog from "./PaymentDialog";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const StripeElement: React.FC<{
  clientSecret: string;
  paymentDialogVisible: boolean;
  setPaymentDialogVisible: (visible: boolean) => void;
  onPaymentSuccess: () => void;
  onPaymentError: (error: any) => void;
}> = ({
  clientSecret,
  paymentDialogVisible,
  setPaymentDialogVisible,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  const options = {
    clientSecret: clientSecret,
    appearance: {
      theme: "stripe" as const,
    },
  };

  return (
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
  );
};

export default StripeElement;
