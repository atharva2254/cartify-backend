const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getByid,
} = require("../controller/productController");
const upload = require("../controller/fileHandler");

router.post("/submit", upload.single("image"), createProduct);
router.get("/view", getProducts);
router.get("/:id", getByid);

module.exports = router;
