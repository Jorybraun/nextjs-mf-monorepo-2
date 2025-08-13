import { openCartDB } from "../../../db/cartDB";

export default async function handler(req, res) {
  console.log("[API] /api/cart/[id] called");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  const db = await openCartDB();
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      // Find and remove item logic here
      //   const index = cart.findIndex(i => i.id === Number(id));
      const result = await db.run("DELETE FROM cart_items WHERE product_id = ?", Number(id));

      if (result.changes === 0) {
        return res.status(404).json({ error: "Item not found" });
      }
      return res.status(204).end(); // No Content
    } catch (err) {
      console.error("Error deleting item:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  res.setHeader("Allow", ["DELETE"]);
  res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
