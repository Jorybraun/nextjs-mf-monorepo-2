import { openProductDB } from "@/db/productDB";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { id } = req.query;

  try {
    const db = await openProductDB();
    const product = await db.get(
      "SELECT * FROM products WHERE id = ?",
      parseInt(id)
    );

    if (!product) {
      console.log(`[API] Product with id ${id} not found`);
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("[API] Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
}
