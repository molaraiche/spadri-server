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
    const productImage = req.file.filename;
    const createNewProduct = await new Products({
      name,
      description,
      quantity,
      price,
      productImage,
    });
    createNewProduct.save();
    res.status(201).json({ response: createNewProduct });
  } catch (error) {
    res.status(500).json({ errorInGetProducts: error.message });
  }
};

const updatedProduct = async (req, res) => {
  try {
    const { name, description, quantity, price, path } = req.body;
    const id = req.params.id;
    const productImage = req.file.filename;
    const updatedProduct = await Products.findByIdAndUpdate(id, {
      name,
      description,
      quantity,
      price,
      productImage,
    });

    res.status(200).json({ response: updatedProduct });
  } catch (error) {
    res.status(500).json({ errorInGetProducts: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    Products.findByIdAndDelete(id);
    res.status(200).json(`product with id ${id} has been deleted !`);
  } catch (error) {
    res.status(500).json({ errorInGetProducts: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updatedProduct,
  deleteProduct,
};
