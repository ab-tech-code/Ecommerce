const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for the User model.
 * This schema defines the structure for user accounts, including authentication details.
 */
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  hashedPassword: {
    type: String,
    required: [true, 'Password is required.'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true,
});

/**
 * Middleware to hash the user's password before saving it to the database.
 * This ensures that plain-text passwords are never stored.
 */
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('hashedPassword')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt);
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * Method to compare a candidate password with the user's hashed password.
 * @param {string} candidatePassword - The password to check.
 * @returns {Promise<boolean>} - True if the password matches, false otherwise.
 */
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.hashedPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
