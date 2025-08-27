const mongoose = require('mongoose');
require('dotenv').config();

// Import Mongoose models
const Product = require('./models/Product');
const BlogPost = require('./models/BlogPost');
const User = require('./models/User');

// --- Sample Data ---

const sampleProducts = [
  // Natural Plants
  {
    name: 'Monstera Deliciosa',
    slug: 'monstera-deliciosa',
    sku: 'NP001',
    category: 'natural',
    description: 'A popular and easy-to-care-for houseplant with iconic split leaves. Thrives in bright, indirect light.',
    price: 35.00,
    stock: 50,
    images: ['/assets/images/placeholder.jpg', '/assets/images/placeholder.jpg'],
    isFeatured: true,
    tags: ['indoor', 'beginner-friendly', 'air-purifying'],
    dimensions: { height: 60, width: 50 },
    careInfo: 'Water every 1-2 weeks, allowing soil to dry out between waterings. Prefers high humidity.',
  },
  {
    name: 'Fiddle Leaf Fig',
    slug: 'fiddle-leaf-fig',
    sku: 'NP002',
    category: 'natural',
    description: 'A statement-making plant with large, violin-shaped leaves. Requires a bit more attention but is well worth the effort.',
    price: 75.00,
    stock: 25,
    images: ['/assets/images/placeholder.jpg'],
    isFeatured: false,
    tags: ['indoor', 'statement', 'tree'],
    dimensions: { height: 120, width: 70 },
    careInfo: 'Loves bright, consistent light. Water when the top inch of soil is dry. Avoid drafts.',
  },
  // Synthetic Plants
  {
    name: 'Artificial Olive Tree',
    slug: 'artificial-olive-tree',
    sku: 'SP001',
    category: 'synthetic',
    description: 'Enjoy the Mediterranean vibe with this stunningly realistic artificial olive tree. No watering required.',
    price: 150.00,
    stock: 40,
    images: ['/assets/images/placeholder.jpg'],
    isFeatured: true,
    tags: ['maintenance-free', 'tree', 'realistic'],
    dimensions: { height: 180 },
  },
  // Garden Furniture
  {
    name: 'Acacia Wood Patio Set',
    slug: 'acacia-wood-patio-set',
    sku: 'GF001',
    category: 'furniture',
    description: 'A beautiful and durable 3-piece patio set, perfect for small balconies or garden corners. Includes two chairs and a small table.',
    price: 299.99,
    stock: 15,
    images: ['/assets/images/placeholder.jpg'],
    isFeatured: true,
    tags: ['outdoor', 'wood', 'set'],
    specs: { "Material": "Acacia Wood", "Weather-Resistant": "Yes" },
  },
  // Planters
  {
    name: 'Modern Ceramic Planter',
    slug: 'modern-ceramic-planter',
    sku: 'PL001',
    category: 'planter',
    description: 'A sleek and minimalist ceramic planter with a drainage hole and optional saucer. Perfect for medium-sized houseplants.',
    price: 25.00,
    stock: 100,
    images: ['/assets/images/placeholder.jpg'],
    isFeatured: false,
    tags: ['ceramic', 'indoor', 'modern'],
    specs: { "Material": "Ceramic", "Color": "Matte White", "Includes Saucer": "Yes" },
    dimensions: { height: 20, width: 20 },
  },
  {
      name: 'Hanging Coconut Fiber Planter',
      slug: 'hanging-coconut-fiber-planter',
      sku: 'PL002',
      category: 'planter',
      description: 'Eco-friendly hanging planter made from coconut fiber with a sturdy metal frame. Ideal for trailing plants.',
      price: 18.50,
      stock: 80,
      images: ['/assets/images/placeholder.jpg'],
      isFeatured: true,
      tags: ['hanging', 'eco-friendly', 'outdoor'],
  }
];

const sampleBlogPosts = (adminUserId) => [
  {
    title: '5 Common Houseplant Mistakes and How to Avoid Them',
    slug: '5-common-houseplant-mistakes',
    heroImage: '/assets/images/placeholder.jpg',
    excerpt: 'Are your green friends looking a little sad? You might be making one of these common mistakes. Learn how to keep your houseplants happy and healthy.',
    content: 'Full blog post content goes here...',
    author: adminUserId,
    tags: ['houseplants', 'tips', 'beginners'],
    isPublished: true,
    publishedAt: new Date(),
  },
  {
    title: 'Choosing the Right Planter for Your Plant',
    slug: 'choosing-the-right-planter',
    heroImage: '/assets/images/placeholder.jpg',
    excerpt: 'The right planter is more than just a decorative pot. It plays a crucial role in the health of your plant. Here’s what to look for.',
    content: 'Full blog post content goes here...',
    author: adminUserId,
    tags: ['planters', 'potting', 'guide'],
    isPublished: true,
    publishedAt: new Date(),
  },
];

// --- Seeding Logic ---

const addProduct = (product) => {
  sampleProducts.push(product);
};

const editProduct = (sku, updatedProduct) => {
  const productIndex = sampleProducts.findIndex(p => p.sku === sku);
  if (productIndex !== -1) {
    sampleProducts[productIndex] = { ...sampleProducts[productIndex], ...updatedProduct };
  }
};

const deleteProduct = (sku) => {
  const productIndex = sampleProducts.findIndex(p => p.sku === sku);
  if (productIndex !== -1) {
    sampleProducts.splice(productIndex, 1);
  }
};

const seedDatabase = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("FATAL ERROR: MONGODB_URI is not defined.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB for seeding.');

    // Clear existing data
    console.log('Clearing existing data...');
    await Product.deleteMany({});
    await BlogPost.deleteMany({});
    await User.deleteMany({}); // Note: This will delete all users!

    // Create a sample admin user
    console.log('Creating admin user...');
    const adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        // In a real app, never store plain text passwords.
        // The pre-save hook in the User model will hash this.
        hashedPassword: 'password123',
        role: 'admin',
    });
    console.log('Admin user created.');

    // Insert new data
    console.log('Seeding products...');
    await Product.insertMany(sampleProducts);
    console.log(`${sampleProducts.length} products have been seeded.`);

    console.log('Seeding blog posts...');
    await BlogPost.insertMany(sampleBlogPosts(adminUser._id));
    console.log(`${sampleBlogPosts().length} blog posts have been seeded.`);

    console.log('Database seeding completed successfully!');

  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

// Run the seeder
seedDatabase();
