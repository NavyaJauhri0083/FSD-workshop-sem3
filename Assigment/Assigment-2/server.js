const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const categories = ['Electronics', 'Home', 'Books', 'Fashion', 'Sports'];
const products = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  description: `A useful ${categories[index % categories.length].toLowerCase()} product.`,
  price: Number((9.99 + index * 2.5).toFixed(2)),
  category: categories[index % categories.length],
  inStock: index % 7 !== 0
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Products REST API',
    endpoints: {
      getAllProducts: 'GET /api/products',
      getProduct: 'GET /api/products/:id',
      createProduct: 'POST /api/products',
      updateProduct: 'PUT /api/products/:id',
      deleteProduct: 'DELETE /api/products/:id'
    }
  });
});

app.get('/api/products', (req, res) => {
  res.json({ count: products.length, products });
});

app.get('/api/products/:id', (req, res) => {
  const product = findProduct(req.params.id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

app.post('/api/products', (req, res) => {
  const { name, description, price, category, inStock = true } = req.body;

  if (!name || description === undefined || price === undefined || !category) {
    return res.status(400).json({
      error: 'name, description, price, and category are required'
    });
  }

  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'price must be a non-negative number' });
  }

  const product = {
    id: getNextId(),
    name,
    description,
    price,
    category,
    inStock: Boolean(inStock)
  };

  products.push(product);
  res.status(201).json(product);
});

app.put('/api/products/:id', (req, res) => {
  const product = findProduct(req.params.id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { name, description, price, category, inStock } = req.body;

  if (price !== undefined && (typeof price !== 'number' || price < 0)) {
    return res.status(400).json({ error: 'price must be a non-negative number' });
  }

  Object.assign(product, {
    ...(name !== undefined && { name }),
    ...(description !== undefined && { description }),
    ...(price !== undefined && { price }),
    ...(category !== undefined && { category }),
    ...(inStock !== undefined && { inStock: Boolean(inStock) })
  });

  res.json(product);
});

app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(
    (product) => product.id === Number(req.params.id)
  );

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const [deletedProduct] = products.splice(productIndex, 1);
  res.json({ message: 'Product deleted successfully', product: deletedProduct });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'Request body must contain valid JSON' });
  }

  next(error);
});

function findProduct(id) {
  return products.find((product) => product.id === Number(id));
}

function getNextId() {
  return products.reduce((highestId, product) => Math.max(highestId, product.id), 0) + 1;
}

app.listen(PORT, () => {
  console.log(`Products API running at http://localhost:${PORT}`);
});
