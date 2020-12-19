const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  imagePath: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  retailer: {
    type: String,
    required: true,
  },
  deliveryMethod: {
    usps: {
      type: String,
    },
    ups: {
      type: String,
    },
    fedexpress: {
      type: String,
    },
    others: {
      type: String,
    },
  },
});

let ShopppingItem;
module.exports = ShopppingItem = mongoose.model('product', ProductSchema);
