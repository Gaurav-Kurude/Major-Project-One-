const mongoose = require("mongoose");

const shoppingSchema = new mongoose.Schema({
  productImage: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productDiscount: {
    type: Number,
    required: true,
  },
  productPriceBeforeDiscount: {
    type: Number,
    required: true,
  },
  productTitle: {
    type: String,
    required: true,
  },
  productRating: {
    type: Number,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productDeliveryCharges: {
    type: Number,
    required: true,
  },
    productCategory: {
    type: [String],
    required: true,
    enum: ["Mens Clothing", "Women's Clothing"]
  },
}, {
  timestamps: true,
});

const Shopping = mongoose.model("Shopping", shoppingSchema);
module.exports = Shopping;
