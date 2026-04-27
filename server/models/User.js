const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Should be hashed
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  loyaltyPoints: { type: Number, default: 0 },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
