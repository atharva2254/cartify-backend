const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const mongoUrl =
  "mongodb+srv://atharva2254:Atharva%40vl004%24@mycluster.fngcxca.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster";

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
