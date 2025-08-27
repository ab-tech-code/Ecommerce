const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'Admin@Albustan';
const ADMIN_PASSWORD = 'AdminPassword123!'; // It's recommended to change this

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

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    // Create a new admin user
    const adminUser = new User({
      name: 'Admin',
      email: ADMIN_EMAIL,
      hashedPassword: hashedPassword,
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
