const password = require("../utils/password");

/* User Controllers
 * This module lists the 4 controllers responsible for the `user` resource
 * Function names referes to the operation on the Data layer. These functions
 * acts as a glue between the external environment and the datastore
 */

function getAUser(req, res) {
  // get uname
  const uname = req.params.uname;
  // query db

  // parse the results
  res.send([req.params.uname]);
}

function createAUser(usersCollection) {
  return async (req, res) => {
    // TODO: @2nd iteration validations
    // create record
    const docToInsert = {
      uname: req.query.uname,
      passwd: await password.hash(req.query.passwd),
      pic: req.query.pic,
      bio: req.query.bio,
    };
    await usersCollection.insertOne(docToInsert);

    res.status(201).json({ uname: docToInsert.uname });
  };
}

function updateAUser(req, res) {
  // get the fields to upadte
  // TODO: @2nd iteration validations
  // update the fields
  // return uname
  res.send([1]);
}

function deleteAUser(req, res) {
  // get the uname
  // delete the record
  // return deleted uname
  res.send([1]);
}

exports.getAUser = getAUser;
exports.createAUser = createAUser;
exports.updateAUser = updateAUser;
exports.deleteAUser = deleteAUser;
