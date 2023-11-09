const { getSlug } = require("../utils/slug");

function getARecipe(recipesCollection) {
  return async (req, res) => {
    try {
      // recipes are identified with recipeId(rid externally to cloak implementation details)
      const query = { slug: req.params.slug };
      const recipe = await recipesCollection.findOne(query, {
        projections: {
          _id: 0,
          title: 1,
          ptime: 1,
          ing: 1,
          slug: 0, // because we already have it, as we'd have queried
        },
      });
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
      slug: getSlug(req.body.title),
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
    const slug = req.params.slug;

    const staleRecord = await recipesCollection.findOne({ slug });

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

function getManyRecipes(recipesCollection) {
  return async (req, res) => {
    const recipes = await recipesCollection.find(
      {},
      {
        projections: {
          _id: 0,
          title: 1,
          ptime: 1,
          ing: 0,
          slug: 1,
        },
      }
    );

    if ((await recipes.countDocuments) === 0) {
      res.status(204).json({ msg: "No recipes have been created yet" });
      return;
    }
    res.json({ recipes: await recipes.toArray() });
  };
}

exports.getARecipe = getARecipe;
exports.createARecipe = createARecipe;
exports.updateARecipe = updateARecipe;
exports.deleteARecipe = deleteARecipe;
exports.getManyRecipes = getManyRecipes;
