import Stripe from "stripe";
import { STRIPE_PRIVATE_KEY, creditPackages } from "../config";

const stripe = new Stripe(STRIPE_PRIVATE_KEY || "");

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
