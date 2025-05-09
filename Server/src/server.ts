import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import InitiateMongoServer from "./db";
import { PORT, WEB_URL } from "./config";
import userRouter from "./routes/user";
import stripeRouter from "./routes/stripe";
import { rateLimit } from "express-rate-limit";
import chatRoutes from "./routes/chat";
import chatroomRoutes from "./routes/chatroom";

const limiter = rateLimit({
  windowMs: 1000,
  limit: 6,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

InitiateMongoServer();

const app: Express = express();
const port = PORT || 8080;

app.use(
  cors({
    origin: true,
    // origin: [WEB_URL || "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.set("trust proxy", "loopback, linklocal, uniquelocal");
app.use(limiter);
app.use(express.json({ limit: "100kb" }));

app.use("/stripe", stripeRouter);

app.use("/user", userRouter);
app.use("/chat", chatRoutes);
app.use("/chatroom", chatroomRoutes);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  const error = {
    status: 404,
    message: "Api endpoint does not found",
  };
  next(error);
});

try {
  app.listen(port, () => {
    console.log(`${port}`);
  });
} catch (error) {
  console.error("Error starting server:", JSON.stringify(error));
  process.exit(1);
}
