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

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(creditPackage.price * 100), // Convert to cents
    currency: "usd",
    metadata: {
      credits: creditPackage.credits.toString(),
      packageId: creditPackage.id,
      customerEmail: email,
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
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
