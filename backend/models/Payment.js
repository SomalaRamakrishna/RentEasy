const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
  house: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  amount: Number,
  currency: String,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  status: {
    type: String,
    enum: ['created', 'paid', 'failed'],
    default: 'created'
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
