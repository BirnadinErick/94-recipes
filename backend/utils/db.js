const { MongoClient } = require("mongodb");

function initDB(URI, DB_NAME) {
  const client = new MongoClient(URI);
  const database = client.db(DB_NAME);

  var repo = {}; // meta container for internal mongo-lib constructs

  // the client, to close it we need to pass this around
  // ok to pass, as to controllers, we only pass collection objects
  repo.client = client;

  // instead of `database`, return `collection` to decrease the
  // surface exposed!
  repo.recipes = database.collection("recipes");
  repo.users = database.collection("users");

  return repo;
}

exports.initDB = initDB;
