const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional if guest
  customerName: { type: String, required: true },
  tableNumber: { type: String, required: true },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    quantity: { type: Number, required: true },
    customizations: { type: Map, of: String } // e.g., { 'Sugar Level': '50%' }
  }],
  totalAmount: { type: Number, required: true },
  gstAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'Ready', 'Served', 'Cancelled'],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  seatingPreference: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
