const Products = require('../model/products_model');

const getAllProducts = async (req, res) => {
  try {
    const getProducts = await Products.find().exec();

    res.status(200).json({ response: getProducts });
  } catch (error) {
    res.status(500).json({ errorInGetProducts: error.message });
  }
};
const createProduct = async (req, res) => {
  try {
    const { name, description, quantity, price, path } = req.body;
    const productImage = req.file ? req.file.path : null; // Use Cloudinary URL
    if (
      !name ||
      !description ||
      !quantity ||
      !price ||
      !path ||
      !productImage
    ) {
      return res.status(400).json({
        message: 'Please fill all the fields and upload an image!',
      });
    }

    const createNewProduct = new Products({
      name,
      description,
      quantity,
      price,
      productImage, // This is now the URL from Cloudinary
      path,
    });

    await createNewProduct.save();
    res.status(201).json({ product: createNewProduct });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
const updatedProduct = async (req, res) => {
  try {
    const { name, description, quantity, price, path } = req.body;
    const id = req.params.id;
    const updateFields = {
      name,
      description,
      quantity,
      price,
      path,
    };

    // If an image was uploaded, update the productImage field
    if (req.file && req.file.path) {
      updateFields.productImage = req.file.path; // Use Cloudinary URL
    }

    if (
      !name ||
      !description ||
      !quantity ||
      !price ||
      !path ||
      !(req.file && req.file.path)
    ) {
      return res.status(400).json({
        message: 'Please fill all the fields and upload an image!',
      });
    }

    const updatedProduct = await Products.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    res.status(200).json({ product: updatedProduct });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Products.findByIdAndDelete(id);
    res.status(200).json(`product with id ${id} has been deleted !`);
  } catch (error) {
    res.status(500).json({ errorInGetProducts: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const productPath = req.params.path;
    const product = await Products.findOne({ path: productPath });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updatedProduct,
  deleteProduct,
  getProduct,
};
