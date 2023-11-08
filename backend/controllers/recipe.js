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

exports.getARecipe = getARecipe;
