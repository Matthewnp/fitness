// Backend/server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import process from "node:process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import authRoutes from "./routes/auth.js";
import checkoutRoutes from "./routes/checkout.js";
import webhookRouter from "./webhook.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Allowed origins for CORS (includes GitHub Pages, local dev, and custom env)
const allowedOrigins = [
  "https://matthewsheldon34.github.io",
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin Render requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/checkout/webhook", webhookRouter);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/checkout", checkoutRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

const buildPath = path.join(__dirname, "..", "dist");
app.use(express.static(buildPath));

app.get("/{*splat}", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(buildPath, "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API + UI running on ${PORT}`));