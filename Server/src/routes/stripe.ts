import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";
import { STRIPE_PRIVATE_KEY, STRIPE_ENDPOINT_SECRET } from "../config";
import User from "../models/user.model";
import type { Request, Response } from "express";

const router = express.Router();
const stripe = new Stripe(STRIPE_PRIVATE_KEY || "");

router.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      const sig = req.headers["stripe-signature"];

      let event;

      if (!sig || !STRIPE_ENDPOINT_SECRET) {
        res.status(400).send(`Webhook Error: No sig or no endpoint secret`);
        return;
      }
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        STRIPE_ENDPOINT_SECRET
      );

      if (event.type === "payment_intent.succeeded") {
        const { metadata } = event.data.object;

        if (metadata?.credits && metadata?.customerEmail) {
          const credits = parseInt(metadata.credits);
          await User.findOneAndUpdate(
            { email: metadata.customerEmail },
            { $inc: { credit: credits } }
          );
        }

        res.status(200).end();
      }
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err}`);
    }
  }
);

export default router;
