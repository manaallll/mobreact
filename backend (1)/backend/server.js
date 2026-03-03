const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// In-memory dataset for jewelry products - ALL 10 PRODUCTS
let jewelryProducts = [
  { 
    id: 1, 
    name: 'Everyday Forever Earrings', 
    price: 120.00, 
    description: 'A minimalist gold bracelet designed to be worn every day. Its delicate shimmer and smooth finish capture effortless beauty that never fades.', 
    rating: 5,
    category: 'earrings',
    image: null
  },
  { 
    id: 2, 
    name: 'Elegant Gems Collection', 
    price: 250.00, 
    description: 'A captivating mix of hand-set gemstones crafted to catch every glint of light. Designed for evenings of elegance and moments that deserve to sparkle.', 
    rating: 4,
    category: 'earrings',
    image: null
  },
  { 
    id: 3, 
    name: 'Classic Timepiece Co.', 
    price: 180.00, 
    description: 'A timeless wristwatch blending precision and poise. The perfect companion for those who value subtle sophistication and enduring style.', 
    rating: 5,
    category: 'earrings',
    image: null
  },
  { 
    id: 4, 
    name: 'Luxe Wearables Inc.', 
    price: 99.99, 
    description: 'Modern elegance meets refined craftsmanship. This piece adds a touch of luxury to any outfit while remaining effortlessly chic.', 
    rating: 4,
    category: 'necklace',
    image: null
  },
  { 
    id: 5, 
    name: 'Shimmer & Shine', 
    price: 300.00, 
    description: 'A statement piece made to dazzle. Its radiant stones and lustrous finish make it the centerpiece of every special occasion.', 
    rating: 5,
    category: 'ring',
    image: null
  },
  { 
    id: 6, 
    name: 'Timeless Treasure', 
    price: 210.00, 
    description: 'Inspired by vintage allure, this design captures everlasting grace. A jewelry box essential that embodies love, tradition, and beauty.', 
    rating: 5,
    category: 'necklace',
    image: null
  },
  { 
    id: 7, 
    name: 'Bold Aura Designs', 
    price: 275.00, 
    description: 'Crafted for those who shine unapologetically. This bold piece commands attention with striking design and undeniable confidence.', 
    rating: 4,
    category: 'ring',
    image: null
  },
  { 
    id: 8, 
    name: 'Gleam & Grace', 
    price: 160.00, 
    description: 'Soft, graceful, and endlessly elegant. Its refined curves and delicate glow bring a touch of class to any look.', 
    rating: 4,
    category: 'ring',
    image: null
  },
  { 
    id: 9, 
    name: 'Golden Era Co.', 
    price: 240.00, 
    description: 'A tribute to the golden age of style. Meticulously crafted from premium materials, it radiates warmth, luxury, and timeless appeal.', 
    rating: 5,
    category: 'ring',
    image: null
  },
  { 
    id: 10, 
    name: 'Opulent Touch', 
    price: 130.00, 
    description: 'The essence of subtle luxury. This understated yet striking piece complements any wardrobe, making sophistication feel effortless.', 
    rating: 4,
    category: 'ring',
    image: null
  }
];

let nextId = 11;

// GET all products
app.get('/api/products', (req, res) => {
  res.json(jewelryProducts);
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = jewelryProducts.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

// POST create new product with image upload
app.post('/api/products', upload.single('image'), (req, res) => {
  try {
    const { name, price, category, description, rating, inStock, material } = req.body;
    
    // Validation
    if (!name || !price || !category || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newProduct = {
      id: nextId++,
      name,
      price: parseFloat(price),
      category,
      description,
      rating: parseInt(rating) || 5,
      image: req.file ? `/uploads/${req.file.filename}` : null
    };
    
    jewelryProducts.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product: ' + error.message });
  }
});

// PUT update existing product with optional image upload
app.put('/api/products/:id', upload.single('image'), (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productIndex = jewelryProducts.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const { name, price, category, description, rating } = req.body;
    
    // If new image is uploaded, update the image path
    let imagePath = jewelryProducts[productIndex].image;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }
    
    const updatedProduct = {
      ...jewelryProducts[productIndex],
      name: name || jewelryProducts[productIndex].name,
      price: price !== undefined ? parseFloat(price) : jewelryProducts[productIndex].price,
      category: category || jewelryProducts[productIndex].category,
      description: description || jewelryProducts[productIndex].description,
      rating: rating !== undefined ? parseInt(rating) : jewelryProducts[productIndex].rating,
      image: imagePath
    };
    
    jewelryProducts[productIndex] = updatedProduct;
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product: ' + error.message });
  }
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = jewelryProducts.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const deletedProduct = jewelryProducts.splice(productIndex, 1)[0];
  res.json({ message: 'Product deleted successfully', product: deletedProduct });
});

// Error handling middleware for multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
  }
  res.status(400).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});