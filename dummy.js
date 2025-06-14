const multer = require("multer");
const express = require("express");
const app = express();
const cors = require("cors");
const { mongoConnect } = require("./models/database");
const { getdb } = require("./models/database");
const path = require("path");
const port = 3000;

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to save images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

class Products {
  constructor(product_name, price, description, category, stock, imagePath) {
    this.product_name = product_name;
    this.price = price;
    this.description = description;
    this.category = category;
    this.stock = stock;
    this.imagePath = imagePath;
  }
  save() {
    const db = getdb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error("Error saving product:", err);
        res.status(500).json({ message: "Failed to save product" });
      });
  }

  static fetchAll() {
    const db = getdb();
    return db
      .collection("products")
      .find()
      .toArray()
      .catch((err) => {
        console.log("Error while fetching data:", err);
      });
  }
}
app.get("/", (req, res) => res.send("Server is running"));

app.post("/submit", upload.single("image"), (req, res) => {
  console.log("Request Received!");

  const imagePath = req.file ? req.file.filename : "";

  console.log("Image Path: ", imagePath); // Debug here!

  const { product_name, price, description, category, stock } = req.body;

  const newProduct = new Products(
    product_name,
    price,
    description,
    category,
    stock,
    imagePath // Pass correct image path
  );

  newProduct
    .save()
    .then(() => {
      console.log("Details saved successfully");
    })
    .catch((err) => {
      console.error("Error saving product:", err);
      res.status(500).json({ message: "Failed to save product" });
    });

  console.log(newProduct);
  res.json({ message: "Product added successfully!", product: newProduct });
});

app.get("/view", (req, res) => {
  Products.fetchAll()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to fetch products" });
      console.log("Error while fetching data from user: ", err);
    });
});

mongoConnect((client) => {
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  );
});
