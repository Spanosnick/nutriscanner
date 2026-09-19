require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET env variable. Check store-api/.env.');
}

// Middleware
app.use(cors());
app.use(express.json());

function omitPassword(store) {
  const { password, ...rest } = store;
  return rest;
}

// Verifies the Bearer token and attaches the authenticated store's id to the request
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing bearer token' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.storeId = payload.storeId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ============= AUTH ROUTES =============

// REGISTER a store account
app.post('/api/auth/register', async (req, res) => {
  try {
    const { storeName, email, password, phone, address } = req.body;
    if (!storeName || !email || !password) {
      return res.status(400).json({ error: 'storeName, email and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const store = await prisma.store.create({
      data: {
        name: storeName,
        email,
        password: passwordHash,
        phone: phone || null,
        address: address || null,
      },
    });

    const token = jwt.sign({ storeId: store.id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, store: omitPassword(store) });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Store name or email is already registered' });
    }
    res.status(400).json({ error: error.message });
  }
});

// LOGIN with email + password
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const store = await prisma.store.findUnique({ where: { email } });
    const passwordMatches = store ? await bcrypt.compare(password, store.password) : false;
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ storeId: store.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, store: omitPassword(store) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET the currently authenticated store
app.get('/api/auth/me', requireAuth, async (req, res) => {
  try {
    const store = await prisma.store.findUnique({ where: { id: req.storeId } });
    if (!store) return res.status(404).json({ error: 'Store not found' });
    res.json({ store: omitPassword(store) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE the currently authenticated store's profile (email is immutable here)
app.put('/api/auth/me', requireAuth, async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Store name is required' });
    }

    const store = await prisma.store.update({
      where: { id: req.storeId },
      data: { name, phone: phone || null, address: address || null },
    });
    res.json({ store: omitPassword(store) });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Store name is already taken' });
    }
    res.status(400).json({ error: error.message });
  }
});

// ============= STORE ROUTES =============

// GET all stores
app.get('/api/stores', async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      include: { products: true }
    });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single store by ID
app.get('/api/stores/:id', async (req, res) => {
  try {
    const store = await prisma.store.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { products: true }
    });
    if (!store) return res.status(404).json({ error: 'Store not found' });
    res.json(store);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE store
app.post('/api/stores', async (req, res) => {
  try {
    const { name, email, password, address, phone, openingHours, socialMedia } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const store = await prisma.store.create({
      data: { name, email, password: passwordHash, address, phone, openingHours, socialMedia }
    });
    res.status(201).json(omitPassword(store));
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Store name or email is already registered' });
    }
    res.status(400).json({ error: error.message });
  }
});

// UPDATE store
app.put('/api/stores/:id', requireAuth, async (req, res) => {
  try {
    const { name, email, address, phone, openingHours, socialMedia } = req.body;
    const store = await prisma.store.update({
      where: { id: parseInt(req.params.id) },
      data: { name, email, address, phone, openingHours, socialMedia }
    });
    res.json(omitPassword(store));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE store
app.delete('/api/stores/:id', requireAuth, async (req, res) => {
  try {
    await prisma.store.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Store deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============= CATEGORY ROUTES =============

// GET all categories
app.get('/api/categories', requireAuth, async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE category
app.post('/api/categories', requireAuth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Category already exists' });
    }
    res.status(400).json({ error: error.message });
  }
});

// UPDATE category
app.put('/api/categories/:id', requireAuth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    const category = await prisma.category.update({
      where: { id: parseInt(req.params.id) },
      data: { name },
    });
    res.json(category);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Category already exists' });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(400).json({ error: error.message });
  }
});

// DELETE category
app.delete('/api/categories/:id', requireAuth, async (req, res) => {
  try {
    await prisma.category.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    if (error.code === 'P2003') {
      return res.status(409).json({ error: 'Category is still assigned to products' });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(400).json({ error: error.message });
  }
});

// ============= PRODUCT ROUTES =============
// All scoped to the authenticated store (req.storeId) — never trust an id from the URL/body for ownership.

// GET all products for the authenticated store (optionally filtered by category)
app.get('/api/products', requireAuth, async (req, res) => {
  try {
    const { categoryId } = req.query;
    const where = { storeId: req.storeId };
    if (categoryId) where.categoryId = parseInt(categoryId);

    const products = await prisma.product.findMany({
      where,
      include: { category: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single product by ID (must belong to the authenticated store)
app.get('/api/products/:id', requireAuth, async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { category: true }
    });
    if (!product || product.storeId !== req.storeId) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE product for the authenticated store
app.post('/api/products', requireAuth, async (req, res) => {
  try {
    const { name, categoryId, calories, price, description } = req.body;
    if (!categoryId) {
      return res.status(400).json({ error: 'categoryId is required' });
    }
    const product = await prisma.product.create({
      data: {
        name,
        categoryId: parseInt(categoryId),
        calories: calories ? parseInt(calories) : null,
        price: parseFloat(price),
        description,
        storeId: req.storeId
      },
      include: { category: true }
    });
    res.status(201).json(product);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'A product with this name already exists' });
    }
    res.status(400).json({ error: error.message });
  }
});

// UPDATE product (must belong to the authenticated store)
app.put('/api/products/:id', requireAuth, async (req, res) => {
  try {
    const existing = await prisma.product.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!existing || existing.storeId !== req.storeId) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { name, categoryId, calories, price, description } = req.body;
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        calories: calories ? parseInt(calories) : null,
        price: parseFloat(price),
        description
      },
      include: { category: true }
    });
    res.json(product);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'A product with this name already exists' });
    }
    res.status(400).json({ error: error.message });
  }
});

// DELETE product (must belong to the authenticated store)
app.delete('/api/products/:id', requireAuth, async (req, res) => {
  try {
    const existing = await prisma.product.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!existing || existing.storeId !== req.storeId) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await prisma.product.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
