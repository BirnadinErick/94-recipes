const { MongoClient } = require("mongodb");

function initDB(URI, DB_NAME) {
  const client = new MongoClient(URI);
  const database = client.db(DB_NAME);

  var repo = {}; // meta container for internal mongo-lib constructs
  repo.client = client; // the client, to close it we need to pass this around
  // TODO: create a class and make client private,
  // TODO: to prevent bypassing below collection and getting database

  // instead of `database`, return `collection` to decrease the
  // surface exposed!
  repo.recipes = database.collection("recipes");
  repo.users = database.collection("users");

  return repo;
}

exports.initDB = initDB;
