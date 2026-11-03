// server/routes/auth.js

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import process from "node:process";
import {sql} from "../db.js";

const router = express.Router();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}
const JWT_SECRET = process.env.JWT_SECRET;

/* ---------- SIGNUP ---------- */
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const password_hash = await bcrypt.hash(password, 12);

    const rows = await sql`
      INSERT INTO users (email, password_hash, first_name, last_name)
      VALUES (${email.toLowerCase()}, ${password_hash}, ${firstName}, ${lastName})
      RETURNING id, email, first_name, last_name, created_at
    `;
    const user = rows[0];

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,  
        lastName: user.last_name,     
      },
      token,
    });
  }  catch (err) {
  const code = err.code ?? err.sourceError?.code;
  const constraint = err.constraint ?? err.sourceError?.constraint;

  if (code === "23505" && constraint === "users_email_key") {
    return res.status(409).json({ message: "Email already registered" });
  }

  console.error("SIGNUP FAILED:", { message: err.message, code, constraint });
  res.status(500).json({ message: "Signup failed", detail: err.message, code });
}
});

/* ---------- LOGIN ---------- */
router.post("/login", async (req, res) => {
  const email = req.body.email?.toLowerCase();
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const rows = await sql`
      SELECT id, email, password_hash, first_name, last_name
      FROM users WHERE email = ${email}
    `;
    const row = rows[0];
    if (!row) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, row.password_hash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { sub: row.id, email: row.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      user: {
        id: row.id,
        email: row.email,
        firstName: row.first_name,   
        lastName: row.last_name,     
      },
      token,
    });
  } catch (err) {
    console.error(err);            
    res.status(500).json({ message: "Login failed" });
  }
});

/* ---------- ME ---------- */
router.get("/me", async (req, res) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const rows = await sql`
      SELECT id, email, first_name, last_name
      FROM users WHERE id = ${payload.sub}
    `;
    if (!rows[0]) return res.status(401).json({ message: "User not found" });

    const u = rows[0];
    res.json({
      user: { id: u.id, email: u.email, firstName: u.first_name, lastName: u.last_name },
    });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

/* ---------- AUTHENTICATION MIDDLEWARE ---------- */
export const requireAuth = (req, res, next) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Decodes the token and attaches user payload (sub, email) to req.user
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default router;