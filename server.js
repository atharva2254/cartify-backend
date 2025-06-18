const mongoose = require("mongoose");
const app = require("./app");
const port = 3000;
require("dotenv").config();

const mongooseUrl = process.env.MONGO_URL;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongoose connected successfully!");
    app.listen(port, () =>
      console.log(`Server running at http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.log("Error while connecting to mongo", err);
  });
