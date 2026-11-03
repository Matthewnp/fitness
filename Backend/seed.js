// Backend/seed.js
import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sql } from "./db.js";
import process from "node:process";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  console.log("📄 Reading schema.sql...");
  const schemaText = await fs.readFile(path.join(__dirname, "schema.sql"), "utf8");

  // 1. 
  const statements = schemaText
    .split(/;\s*$/m)
    .map((s) =>
      s
        .split("\n")
        .filter((line) => !/^\s*--/.test(line)) 
        .join("\n")
        .trim()
    )
    .filter((s) => s.length > 0);

  console.log(` Applying ${statements.length} statements...`);
  
  // 2. Loop and execute each statement individually
  for (const stmt of statements) {
    // Using sql.query() for raw strings (NOT the tagged template `sql\`...\``)
    await sql.query(stmt);
  }

  console.log("Inserting seed products...");
  await sql`
    INSERT INTO products (name, price) VALUES
      ('Starter', 20.00),
      ('Popular', 200.00),
      ('Elite',   300.00)
  `;

  console.log(" Database seeded successfully.");
  const products = await sql`SELECT id, name, price FROM products ORDER BY id`;
  console.table(products);
  process.exit(0);
} catch (err) {
  console.error(" Seed failed:", err);
  process.exit(1);
}