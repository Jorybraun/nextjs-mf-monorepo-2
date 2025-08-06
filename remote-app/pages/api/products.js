export default function handler(req, res) {
  console.log('[API] /api/products called');
  // Simulate a delay using a Promise
  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ];
  console.log('[API] Returning products:', products);
  res.status(200).json(products);
}
