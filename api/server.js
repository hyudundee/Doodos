const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const app = express();

const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/cart', require('./routes/api/cart'));
app.use('/api/events', require('./routes/api/events'));
app.use('/api/maps', require('./routes/api/maps'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
