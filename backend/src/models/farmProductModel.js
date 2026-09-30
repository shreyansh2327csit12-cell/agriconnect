import mongoose from "mongoose";

const farmProductSchema = new mongoose.Schema({
  id:{
    type: String,
    required: [true, 'Product ID is required'],
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  imageUrl: {
    type: String,
    required: [true, 'Product image URL is required']
  },
  link: {
    type: String,
    required: [true, 'Product Link is required']
  },
});

const FarmProduct = mongoose.model('FarmProduct', farmProductSchema);

export default FarmProduct;
