const { MongoClient } = require("mongodb");
require("dotenv").config();

const mongoUrl = process.env.MONGO_URI;
let _db;

const mongoConnect = async (callback) => {
  try {
    const client = await MongoClient.connect(mongoUrl); // No options needed
    console.log("✅ MongoDB Connected Successfully");
    _db = client.db("Cartify");
    callback(client);
  } catch (err) {
    console.error("❌ MongoDB Connection Error: ", err);
  }
};

const getdb = () => {
  if (!_db) {
    throw new Error("Mongo not connected!");
  }
  return _db;
};

module.exports = { mongoConnect, getdb };
