function getARecipe(recipesCollection) {
  return async (req, res) => {
    try {
      // recipes are identified with recipeId(rid externally to cloak implementation details)
      const query = { recipeId: parseInt(req.params.rid) };
      const recipe = await recipesCollection.findOne(query);
      res.json(recipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  };
}

function createARecipe(recipesCollection) {
  return async (req, res) => {
    // TODO: document POST schema
    const docToInsert = {
      ...req.body,
      views: 1,
      likes: 0,
    };

    const result = await recipesCollection.insertOne(docToInsert);
    if (result.acknowledged) {
      delete docToInsert._id;
      delete docToInsert.isdraft;
      res.status(201).json(docToInsert);
    } else {
      res.status(501).json({ msg: "Unable to create the recipe", ...req.body });
    }
  };
}

function updateARecipe(recipesCollection) {
  return async (req, res) => {
    const rid = req.params.rid;

    const staleRecord = await recipesCollection.findOne({
      recipeId: parseInt(rid),
    });

    const newRecord = {
      ...staleRecord,
      ...req.body,
    };

    const query = { _id: { $eq: staleRecord._id } };
    const result = await recipesCollection.replaceOne(query, newRecord);

    if (result.acknowledged) {
      delete newRecord._id;
      delete newRecord.isdraft;
      res.status(202).json(newRecord);
    } else {
      res.status(400).json({ msg: "Couldn't update the record" });
    }
  };
}

function deleteARecipe(recipesCollection) {
  return async (req, res) => {
    const rid = req.params.rid;
    const result = await recipesCollection.deleteOne({
      recipeId: parseInt(rid),
    });

    if (result.acknowledged) {
      res.sendStatus(202);
    } else {
      res.status(400).json({ msg: "Couldn't delete the record" });
    }
  };
}

exports.getARecipe = getARecipe;
exports.createARecipe = createARecipe;
exports.updateARecipe = updateARecipe;
exports.deleteARecipe = deleteARecipe;
