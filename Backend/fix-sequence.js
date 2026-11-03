// Backend/fix-sequence.js
import "dotenv/config";
import { sql } from "./db.js";
import process from "node:process";
await sql`SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) FROM users), 0) + 1, false)`;
const check = await sql`SELECT last_value FROM users_id_seq`;
console.log(" users_id_seq reset to:", check[0].last_value);
process.exit(0);