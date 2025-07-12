const express = require("express");
const app = express();
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("<h1>Server is Live</h1><br><p>Major updates added</p>");
});

app.use("/products", productRoutes);

module.exports = app;
