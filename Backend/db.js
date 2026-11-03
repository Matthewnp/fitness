// server/db.js
import "dotenv/config";       
                // load .env before reading it
import process from "node:process";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing — check your .env file");
}

export const sql = neon(process.env.DATABASE_URL);
