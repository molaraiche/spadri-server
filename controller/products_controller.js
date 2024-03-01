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
    if (
      !name ||
      !description ||
      !quantity ||
      !price ||
      !path ||
      !productImage
    ) {
      res.status(400).json({
        fillTheFields: 'Please fill all the fields !',
      });
    } else {
      const createNewProduct = await new Products({
        name,
        description,
        quantity,
        price,
        productImage,
        path,
      });
      createNewProduct.save();
      res.status(201).json({ response: createNewProduct });
    }
  } catch (error) {
    res.status(500).json({ errorInGetProducts: error.message });
  }
};

const updatedProduct = async (req, res) => {
  try {
    const { name, description, quantity, price, path } = req.body;
    const id = req.params.id;
    const productImage = req.file.filename;
    if (
      !name ||
      !description ||
      !quantity ||
      !price ||
      !path ||
      !productImage
    ) {
      res.status(400).json({
        fillTheFields: 'Please fill all the fields !',
      });
    } else {
      const updatedProduct = await Products.findByIdAndUpdate(id, {
        name,
        description,
        quantity,
        price,
        productImage,
        path,
      });

      res.status(200).json({ response: updatedProduct });
    }
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
