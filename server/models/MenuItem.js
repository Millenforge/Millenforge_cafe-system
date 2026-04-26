const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    enum: ['tea', 'coffee', 'snacks', 'desserts', 'other'],
    required: true
  },
  image: { type: String },
  isBestSeller: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
  customizationOptions: [{
    name: String, // e.g., 'Sugar Level', 'Milk Preference'
    options: [String], // e.g., ['0%', '25%', '50%', '100%'], ['Oat Milk', 'Almond Milk']
  }]
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
