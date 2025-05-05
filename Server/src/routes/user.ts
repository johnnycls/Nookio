import express from "express";
import { Router } from "express";
import type { Request, Response } from "express";
import User from "../models/user.model";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { GOOGLE_CLIENT_ID, JWT_SECRET } from "../config";
import authMiddleware from "../middlewares/auth";
import { createPaymentSession } from "../utils/payment";

const router: Router = express.Router();

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    console.log(JSON.stringify(error));
    return { error: "Invalid user detected. Please try again" };
  }
}

// register/login;
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { clientId, credential } = req?.body?.credentials;
    if (credential) {
      const verificationResponse = await verifyGoogleToken(credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const email = verificationResponse?.payload?.email;
      let user = await User.findOne({ email });

      if (!user) {
        await User.create({ email });
      }

      if (JWT_SECRET) {
        const token = jwt.sign({ email }, JWT_SECRET, {
          expiresIn: "30d",
        });
        return res.status(200).json({ token });
      } else {
        return res.status(500).json("No JWT Secret");
      }
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(500).json("error");
  }
});

// Get user profile
router.get("/profile", authMiddleware, async (req: Request, res: Response) => {
  try {
    const email = res.locals.email as string;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profile = {
      _id: user._id,
      email: user.email,
      name: user.name || "",
      description: user.description || "",
      gender: user.gender || "",
      dob: user.dob || new Date(),
      credit: user.credit || 0,
      chats: user.chats || [],
      lang: user.lang || "en",
    };

    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update user profile
router.patch(
  "/profile",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const email = res.locals.email as string;
      const { name, description, gender, dob, lang } = req.body;

      const user = await User.findOneAndUpdate(
        { email },
        {
          $set: {
            ...(name !== undefined && { name }),
            ...(description !== undefined && { description }),
            ...(gender !== undefined && { gender }),
            ...(dob !== undefined && { dob }),
            ...(lang !== undefined && { lang }),
          },
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const profile = {
        _id: user._id,
        email: user.email,
        name: user.name || "",
        description: user.description || "",
        gender: user.gender || "",
        dob: user.dob || new Date(),
        credit: user.credit || 0,
        chats: user.chats || [],
        lang: user.lang || "en",
      };

      return res.status(200).json(profile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Purchase credits
router.post(
  "/purchase",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { packageId } = req.body;
      const email = res.locals.email as string;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const session = await createPaymentSession(packageId, user.email);
      return res.status(200).json({ url: session.url });
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message === "Invalid package ID") {
        return res.status(400).json({ message: "Invalid package ID" });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
