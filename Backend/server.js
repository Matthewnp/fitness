// Backend/server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import process from "node:process";
import authRoutes from "./routes/auth.js";
       
import checkoutRoutes from "./routes/checkout.js";
import webhookRouter from "./webhook.js";         

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",   
    credentials: true,
  })
);

app.use("/api/checkout/webhook", webhookRouter);         
app.use(express.json());                              

app.use("/api/auth", authRoutes);
app.use("/api/checkout",  checkoutRoutes);  

app.listen(process.env.PORT || 4000, () =>
  console.log(" API running on", process.env.PORT || 4000)
);