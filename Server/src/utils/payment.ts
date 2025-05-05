import Stripe from "stripe";
import { WEB_URL, STRIPE_PRIVATE_KEY } from "../config";

const stripe = new Stripe(STRIPE_PRIVATE_KEY || "");

export interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  label: string;
}

export const creditPackages: CreditPackage[] = [
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

export async function createPaymentSession(packageId: string, email: string) {
  const creditPackage = creditPackages.find((pkg) => pkg.id === packageId);

  if (!creditPackage) {
    throw new Error("Invalid package ID");
  }

  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    metadata: {
      credits: creditPackage.credits.toString(),
    },
    customer_email: email,
    // allow_promotion_codes: true,
    // payment_intent_data: { capture_method: "manual" },
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: creditPackage.label,
          },
          unit_amount: Math.round(creditPackage.price * 100), // Convert to cents
        },
        quantity: 1,
      },
    ],
    success_url: `${WEB_URL}`,
  });
}

export async function capturePayment(paymentIntent: string) {
  return await stripe.paymentIntents.capture(paymentIntent);
}

export async function cancelPayment(paymentIntent: string) {
  return await stripe.paymentIntents.cancel(paymentIntent);
}

export async function refund(paymentIntent: string, amount: number) {
  return await stripe.refunds.create({
    payment_intent: paymentIntent,
    amount,
  });
}
