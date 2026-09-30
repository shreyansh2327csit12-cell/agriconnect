import express from 'express';
import { getAllProducts, createProduct } from '../controllers/farmProductController.js';

const router = express.Router();

// GET all products and POST new product
router
  .route('/')
  .get(getAllProducts)
  .post(createProduct);

export default router;
