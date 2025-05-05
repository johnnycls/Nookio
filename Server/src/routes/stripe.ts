import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";
import { STRIPE_PRIVATE_KEY, STRIPE_ENDPOINT_SECRET } from "../config";
import User from "../models/user.model";

const router = express.Router();
const stripe = new Stripe(STRIPE_PRIVATE_KEY || "");

router.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const payload = req.body;
      const sig = req.headers["stripe-signature"];

      let event;

      if (!sig || !STRIPE_ENDPOINT_SECRET) {
        return res
          .status(400)
          .send(`Webhook Error: No sig or no endpoint secret`);
      }
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        STRIPE_ENDPOINT_SECRET
      );

      if (event.type === "checkout.session.completed") {
        const session = await stripe.checkout.sessions.retrieve(
          event.data.object.id
        );

        const { metadata, customer_email } = session;

        if (metadata?.credits && customer_email) {
          const credits = parseInt(metadata.credits);
          await User.findOneAndUpdate(
            { email: customer_email },
            { $inc: { credit: credits } }
          );
        }

        res.status(200).end();
      }
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err}`);
    }
  }
);

export default router;
