const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Item = require('./model/itemSchema');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('DB Connection Error:', err));

// Single Route Handler for /api/items
app
  .route('/api/items')
  .get(async (req, res) => {
    try {
      const items = await Item.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: 'Server error while fetching items' });
    }
  })
  .post(async (req, res) => {
    try {
      const newItem = new Item({ name: req.body.name });
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (err) {
      res.status(400).json({ error: 'Please provide an item name' });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));