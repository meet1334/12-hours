const mongoose = require("mongoose");
const { Schema } = mongoose;
//schema
const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, min: [0, "wrong price"], required: true },
  discountPercentage: {
    type: Number,
    min: [0, "wrong min discountPercentage"],
    max: [25, "wrong max discountPercentage"],
  },
  rating: {
    type: Number,
    min: [0, "wrong min rating"],
    max: [5, "wrong max rating"],
    default: 0,
  },
  stock: {
    type: Number,
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [String],
});

//model creation
exports.Product = mongoose.model("Product", productSchema);
