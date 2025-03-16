const mongoose = require('mongoose');
const User = require('./UserModel');

const productSchema = new mongoose.Schema({

  propertyName: String,
  propertyLocation: String,
  images: [String],
  rent: Number,
  createdAt: {
    type: Date,
    default: Date.now, // Function reference to dynamically assign the current date
  },
  facilities: {

    bedrooms: Number,
    bathrooms: Number
  },
  propertyType: String,
  amenities: [String],
  description: {
    type: String,
    maxlength: 3000
  },
  contactDetails: {
    phoneNumber: String,
    email: String
  },
  maxAccomodation: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  }
});

const Product = mongoose.model('product', productSchema);
module.exports = Product