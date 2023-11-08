function getARecipe(recipesCollection) {
  return async (req, res) => {
    // rid is external identifier for a recipe
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

function putARecipe(recipesCollection) {
  return async (res, req) => {};
}

function deleteARecipe(recipesCollection) {
  return async (res, req) => {};
}

exports.getARecipe = getARecipe;
exports.createARecipe = createARecipe;
exports.putARecipe = putARecipe;
exports.deleteARecipe = deleteARecipe;
