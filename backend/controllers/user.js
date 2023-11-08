const password = require("../utils/password");

/* User Controllers
 * This module lists the 4 controllers responsible for the `user` resource
 * Function names referes to the operation on the Data layer. These functions
 * acts as a glue between the external environment and the datastore
 */

function getAUser(usersCollection) {
  return async (req, res) => {
    const user = await usersCollection.findOne({ uname: req.params.uname });

    // _id is internal, no need to leak
    // could have specified in options.projection for `findOne` but, deleting just 1
    // seems overwight!
    // TODO: exclude at Data Layer
    delete user._id;
    res.json(user);
  };
}

function createAUser(usersCollection) {
  return async (req, res) => {
    // TODO: @2nd iteration validations
    const docToInsert = {
      uname: req.body.uname,
      passwd: await password.hash(req.body.passwd),
      bio: req.body.bio,
    };

    const result = await usersCollection.insertOne(docToInsert);
    if (result.acknowledged) {
      res.status(201).json({ uname: docToInsert.uname });
    } else {
      res.status(501).json({ msg: "Unable to create user" });
    }
  };
}

/*
 * Since assignment specification doesn't require these
 * following features, these are here as a second thought
 */
function updateAUser(req, res) {
  // get the fields to upadte
  const updateDoc = {};
  // TODO: @2nd iteration validations
  // update the fields
  // return uname
  throw Error("not implemented");
}

function deleteAUser(req, res) {
  // get the uname
  // delete the record
  // return deleted uname
  throw Error("not implemented");
}

exports.getAUser = getAUser;
exports.createAUser = createAUser;
exports.updateAUser = updateAUser;
exports.deleteAUser = deleteAUser;
