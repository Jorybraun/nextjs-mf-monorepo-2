import { openCartDB, withSession } from "../../../db/cartDB";
import type { NextApiRequest, NextApiResponse } from "next";

interface SessionApiRequest extends NextApiRequest {
  sessionId?: string;
}

async function handler(req: SessionApiRequest, res: NextApiResponse) {
  console.log("[API] /api/cart called");

  // Get the origin from the request
  const origin = req.headers.origin;
  const allowedOrigins = [
    "http://localhost:3000", // host-app
    "http://localhost:3002", // product-app
    "http://localhost:3005", // checkout-app
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Session-ID");
  res.setHeader("Access-Control-Expose-Headers", "X-Session-ID");
  res.setHeader("Content-Type", "application/json");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const db = await openCartDB();

    if (req.method === "GET") {
      // if no cart exists we need to create a cart
      console.log("GET cart for session:", req.sessionId);

      // Debug: check all cart items
      const allItems = await db.all("SELECT * FROM cart_items");
      console.log("ALL cart items:", allItems);

      let cart = await db.all(
        "SELECT * FROM cart_items WHERE session_id = ?",
        req.sessionId
      );
      console.log("GET cart result:", cart);
      return res.status(200).json(cart);
    }

    if (req.method === "POST") {
      // Add item to cart
      console.log("Raw body:", req.body);
      console.log("Body type:", typeof req.body);

      let item;
      try {
        // If body is already parsed (object), use it directly
        // If body is string, parse it
        item = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      } catch (parseError) {
        console.error("Error parsing request body:", parseError);
        return res.status(400).json({ error: "Invalid JSON in request body" });
      }

      console.log("POST CART", item);
      console.log("Session ID:", req.sessionId);

      const result = await db.run(
        `
        INSERT INTO cart_items (session_id, product_id, quantity)
        VALUES (?, ?, ?)
        ON CONFLICT(session_id, product_id) 
        DO UPDATE SET quantity = quantity + ?`,
        req.sessionId,
        item.product_id,
        item.quantity,
        item.quantity
      );

      console.log("INSERT result:", result);

      const cart = await db.all(
        "SELECT * FROM cart_items WHERE session_id = ?",
        req.sessionId
      );

      console.log("Cart after insert:", cart);
      return res.status(200).json(cart);
    }

    if (req.method === "DELETE") {
      // Clean up broken data (session_id = undefined/null)
      const result = await db.run(
        "DELETE FROM cart_items WHERE session_id IS NULL OR session_id = 'undefined' OR product_id IS NULL"
      );
      console.log("Cleaned up broken data:", result);
      return res
        .status(200)
        .json({ message: "Cleaned up broken data", changes: result.changes });
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
    return res.status(500).json({ error: "Failed to add item to cart" });
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default withSession(handler);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
