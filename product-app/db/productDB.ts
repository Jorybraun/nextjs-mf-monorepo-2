import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const openProductDB = async () => {
  const db = await open({
    filename: "./products.db",
    driver: sqlite3.Database,
  });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image TEXT,
      category TEXT,
      in_stock BOOLEAN DEFAULT 1,
      rating REAL DEFAULT 0,
      reviews INTEGER DEFAULT 0
    )
  `);
  await seedProducts(db);
  return db;
};

async function seedProducts(db) {
  // Check if products already exist
  const count = await db.get("SELECT COUNT(*) as count FROM products");
  if (count.count > 0) return; // Products already exist

  const sampleProducts = [
    {
      name: "Smart Watch Series 5",
      price: 299.99,
      description: "Advanced smartwatch with health monitoring",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      category: "Electronics",
      in_stock: 1,
      rating: 4.5,
      reviews: 128,
    },
    {
      name: "Premium Coffee Beans",
      price: 24.99,
      description: "Single-origin arabica coffee beans",
      image:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80",
      category: "Food & Beverage",
      in_stock: 1,
      rating: 4.8,
      reviews: 92,
    },
    {
      name: "Ergonomic Office Chair",
      price: 449.99,
      description: "Comfortable office chair with lumbar support",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
      category: "Furniture",
      in_stock: 1,
      rating: 4.3,
      reviews: 67,
    },
    {
      name: "Portable Power Bank",
      price: 39.99,
      description: "10,000mAh portable battery charger",
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=80",
      category: "Electronics",
      in_stock: 1,
      rating: 4.2,
      reviews: 203,
    },
    {
      name: "Yoga Mat Premium",
      price: 79.99,
      description: "Non-slip yoga mat with alignment guides",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
      category: "Fitness",
      in_stock: 1,
      rating: 4.6,
      reviews: 156,
    },
  ];

  // Insert sample products
  for (const product of sampleProducts) {
    await db.run(
      `INSERT INTO products (name, price, description, image, category, in_stock, rating, reviews)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      product.name,
      product.price,
      product.description,
      product.image,
      product.category,
      product.in_stock,
      product.rating,
      product.reviews
    );
  }

  console.log(`Seeded ${sampleProducts.length} products`);
}
