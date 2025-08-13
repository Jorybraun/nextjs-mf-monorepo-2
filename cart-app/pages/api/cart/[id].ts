import { openCartDB, withSession } from "../../../db/cartDB";
import type { NextApiRequest, NextApiResponse } from "next";

interface SessionApiRequest extends NextApiRequest {
  sessionId?: string;
}

async function handler(req: SessionApiRequest, res: NextApiResponse) {
  console.log("[API] /api/cart/[id] called");
  
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

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Session-ID");
  res.setHeader("Access-Control-Expose-Headers", "X-Session-ID");
  res.setHeader("Content-Type", "application/json");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const db = await openCartDB();
  const { id } = req.query;
  const productId = Number(id);

  if (req.method === "DELETE") {
    try {
      console.log(`Deleting item with product_id ${productId} for session ${req.sessionId}`);
      
      const result = await db.run(
        "DELETE FROM cart_items WHERE product_id = ? AND session_id = ?", 
        productId, 
        req.sessionId
      );

      if (result.changes === 0) {
        return res.status(404).json({ error: "Item not found" });
      }
      
      console.log(`Deleted ${result.changes} item(s)`);
      return res.status(204).end(); // No Content
    } catch (err) {
      console.error("Error deleting item:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "PATCH") {
    try {
      console.log("Raw PATCH body:", req.body);
      
      let body;
      try {
        body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      } catch (parseError) {
        console.error("Error parsing PATCH request body:", parseError);
        return res.status(400).json({ error: "Invalid JSON in request body" });
      }

      const { quantity } = body;
      
      if (typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).json({ error: "Invalid quantity. Must be a non-negative number." });
      }

      console.log(`Updating quantity to ${quantity} for product_id ${productId} and session ${req.sessionId}`);

      if (quantity === 0) {
        // If quantity is 0, delete the item
        const result = await db.run(
          "DELETE FROM cart_items WHERE product_id = ? AND session_id = ?", 
          productId, 
          req.sessionId
        );
        console.log(`Deleted ${result.changes} item(s) due to quantity 0`);
      } else {
        // Update the quantity
        const result = await db.run(
          `UPDATE cart_items SET quantity = ? WHERE product_id = ? AND session_id = ?`,
          quantity,
          productId,
          req.sessionId
        );

        if (result.changes === 0) {
          return res.status(404).json({ error: "Item not found" });
        }
        
        console.log(`Updated ${result.changes} item(s) with new quantity`);
      }

      return res.status(204).end(); // No Content
    } catch (err) {
      console.error("Error updating quantity:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  res.setHeader("Allow", ["DELETE", "PATCH"]);
  res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}

export default withSession(handler);
