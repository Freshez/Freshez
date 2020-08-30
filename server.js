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

const path = require('path');

app.use(express.static(path.join(__dirname, 'client/public')));

// if (process.env.NODE_ENV === 'production') {
//   app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
//   });
// }

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
if (process.env.NODE_ENV === 'development') {
  app.use('/api/users', require('./routes/api/users'));
  app.use('/api/auth', require('./routes/api/auth'));
  app.use('/api/vendorprofile', require('./routes/api/vendorprofile'));
  app.use('/api/customerprofile', require('./routes/api/customerprofile'));
  app.use('/api/posts', require('./routes/api/posts'));
  app.use('/api/products', require('./routes/api/products'));
}

if (process.env.NODE_ENV === 'production') {
  app.use('/users', require('./routes/api/users'));
  app.use('/auth', require('./routes/api/auth'));
  app.use('/vendorprofile', require('./routes/api/vendorprofile'));
  app.use('/customerprofile', require('./routes/api/customerprofile'));
  app.use('/posts', require('./routes/api/posts'));
  app.use('/products', require('./routes/api/products'));
}

console.log('ENV');
console.log(process.env.NODE_ENV);

// Listening
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));
