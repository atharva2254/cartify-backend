const mongo = require("mongodb");
require("dotenv").config();

const MongoClient = mongo.MongoClient;
const mongoUrl = process.env.MONGO_URI;
console.log(mongoUrl);
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(mongoUrl)
    .then((client) => {
      callback(client);
      _db = client.db("Cartify");
    })
    .catch((err) => {
      console.log("Error while connecting: ", err);
    });
};

const getdb = () => {
  if (!_db) {
    throw new Error("Mongo not connected!");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;
