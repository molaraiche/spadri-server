const {
  getAllProducts,
  createProduct,
  updatedProduct,
  deleteProduct,
  getProduct,
} = require('../controller/products_controller');
const { productUpload } = require('../utils/uploader');

const router = require('express').Router();

router.get('/', getAllProducts);
router.post('/newProduct', productUpload, createProduct);
router.put('/:id', productUpload, updatedProduct);
router.delete('/:id', deleteProduct);
router.get('/:path', getProduct);
module.exports = router;
