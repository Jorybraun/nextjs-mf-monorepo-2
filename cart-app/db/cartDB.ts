import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { v4 as uuidv4 } from "uuid";

export function withSession<T>(handler) {
  return async (req, res) => {
    // Only use session ID from header for cross-origin compatibility
    let sessionId = req.headers["x-session-id"];
    console.log("Session ID from header:", sessionId);

    if (!sessionId) {
      sessionId = uuidv4();
      console.log("Generated new session ID:", sessionId);

      // Send session ID in response header so client can store it
      res.setHeader("X-Session-ID", sessionId);
    }
    req.sessionId = sessionId;
    console.log("Using session ID:", sessionId);
    return handler(req, res);
  };
}

export const openCartDB = async () => {
  const db = await open({ filename: "./db/cart.db", driver: sqlite3.Database });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cart_items (
      session_id TEXT,
      product_id INTEGER,
      quantity INTEGER,
      price REAL,
      PRIMARY KEY (session_id, product_id)
    )
  `);
  
  // Add price column if it doesn't exist (for existing databases)
  try {
    await db.exec(`ALTER TABLE cart_items ADD COLUMN price REAL`);
  } catch (err) {
    // Column already exists, ignore error
  }
  
  return db;
};
