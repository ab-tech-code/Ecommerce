const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin';

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: ADMIN_EMAIL });
    if (adminExists) {
      console.log('Admin user already exists.');
      return;
    }

    // Create a new admin user (password will be hashed by pre-save hook)
    const adminUser = new User({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      hashedPassword: ADMIN_PASSWORD, // pass plain text, hook will hash it
      role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  } finally {
    mongoose.disconnect();
    console.log('MongoDB Disconnected.');
  }
};

seedAdmin();
