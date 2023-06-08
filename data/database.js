const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;

let database = null;

async function connectToDatabase() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  database = client.db("online-shop");
}

function getDb() {
  if (!database) {
    throw new Error("You must first connect!");
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
