const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const cloudinary = require('cloudinary');
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/vendorprofile', require('./routes/api/vendorprofile'));
app.use('/api/customerprofile', require('./routes/api/customerprofile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/products', require('./routes/api/products'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
