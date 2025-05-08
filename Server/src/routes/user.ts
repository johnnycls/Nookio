import express from "express";
import { Router } from "express";
import type { Request, Response } from "express";
import User from "../models/user.model";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import {
  GOOGLE_CLIENT_ID,
  JWT_SECRET,
  MIN_CREDITS_FOR_AUTO_CHAT,
  MAX_CHATROOMS,
} from "../config";
import authMiddleware from "../middlewares/auth";
import { createPaymentSession } from "../utils/payment";
import { handleCreateRequest } from "../services/open_chatroom_service";

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
    const { credential } = req?.body?.credentials;
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
      preferedGender: user.preferedGender || "both",
      credit: user.credit || 0,
      lang: user.lang || "en",
      targetChatrooms: user.targetChatrooms || 0,
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
      const {
        name,
        description,
        gender,
        dob,
        lang,
        targetChatrooms,
        preferedGender,
      } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update basic profile fields
      if (name !== undefined) user.name = name;
      if (description !== undefined) user.description = description;
      if (gender !== undefined) user.gender = gender;
      if (dob !== undefined) user.dob = dob;
      if (lang !== undefined) user.lang = lang;
      if (preferedGender !== undefined) user.preferedGender = preferedGender;

      // Handle targetChatrooms update
      if (targetChatrooms !== undefined) {
        const currentChatrooms = user.chatrooms.length;
        const newTarget = Math.min(targetChatrooms, MAX_CHATROOMS);

        // Calculate how many new chatrooms to create
        const additionalChatrooms = Math.max(0, newTarget - currentChatrooms);

        // Check if user has enough credits
        const requiredCredits = additionalChatrooms * MIN_CREDITS_FOR_AUTO_CHAT;
        if (user.credit < requiredCredits) {
          return res.status(400).json({
            message: "Not enough credits",
            required: requiredCredits,
            available: user.credit,
          });
        }

        if (additionalChatrooms > 0) {
          user.credit -= requiredCredits;
          await handleCreateRequest(user, additionalChatrooms);
        }

        user.targetChatrooms = newTarget;
      }

      await user.save();

      const profile = {
        _id: user._id,
        email: user.email,
        name: user.name || "",
        description: user.description || "",
        gender: user.gender || "",
        dob: user.dob || new Date(),
        credit: user.credit || 0,
        lang: user.lang || "en",
        targetChatrooms: user.targetChatrooms || 0,
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
      return res.status(200).json({ clientSecret: session.clientSecret });
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
