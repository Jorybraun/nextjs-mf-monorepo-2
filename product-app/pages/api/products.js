import { openProductDB } from "@/db/productDB";

export default async function handler(req, res) {
  console.log('[API] /api/products called');

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  try {
    const db = await openProductDB();
    const products = await db.all("SELECT * FROM products");
    
    console.log(`[API] Found ${products.length} products`);
    return res.status(200).json(products); // Returns [] if no products
  } catch (error) {
    console.error('[API] Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
