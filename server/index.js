// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = a= require('morgan');
require('dotenv').config();

// Initialize the Express app
const app = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

// Set various HTTP headers for security
app.use(helmet());

// Parse incoming JSON requests
app.use(express.json());

// Log HTTP requests in 'dev' format
app.use(morgan('dev'));


// --- Database Connection ---
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("FATAL ERROR: MONGODB_URI is not defined.");
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Successfully connected to MongoDB.'))
.catch(err => {
  console.error('Database connection error:', err);
  process.exit(1);
});


// --- API Routes ---
// Import route files
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const blogRoutes = require('./routes/blog');
const contactRoutes = require('./routes/contact');
const paymentRoutes = require('./routes/payments');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Root endpoint to check if the server is running
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Garden E-commerce API! Navigate to /api/products to see products.' });
});

// --- Error Handling Middleware ---
// 404 Not Found handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// General error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});


// --- Server Initialization ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export for potential testing
