const product = require("../models/product");
const Product = require("../models/product");

const createProduct = async (req, res) => {
  const { product_name, price, description, category, stock } = req.body;
  const imagePath = req.file ? req.file.filename : "";
  const product = new Product({
    product_name,
    price,
    description,
    category,
    stock,
    imagePath,
  });
  const createdProduct = await product.save();
  res.status(201).json({
    message: "Product added successfully!✅",
    product: createdProduct,
  });
  console.log(product);
};

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const getByid = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found!" });
  }
};
module.exports = { createProduct, getProducts, getByid };
