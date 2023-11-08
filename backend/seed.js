const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const { faker } = require("@faker-js/faker");

var env = dotenv.config();
dotenvExpand.expand(env);

const recipeSchema = new mongoose.Schema({
  title: String,
  ptime: [Number], // preparation time in hours and minutes
  ing: [{}], // ingredients
});

const Recipe = mongoose.model("Recipe", recipeSchema);

mongoose
  .connect(process.env["ATLAS_URI"])
  .then(() => {
    console.log("Connected to MongoDB");

    // create 10 fake recipes
    for (let i = 0; i < 10; i++) {
      let newRecipe = new Recipe({
        title: faker.commerce.productName(),
        ptime: [
          Math.floor(Math.random() * 10), //preparation hours between 0-10
          Math.floor(Math.random() * 60), //preparation minutes between 0-59
        ],
        ing: [
          {
            [faker.commerce.productAdjective()]:
              faker.number.int({ min: 1 }) + " kg",
          },
          {
            [faker.commerce.productMaterial()]: faker.number.int({ min: 1 }),
          },
          { [faker.commerce.product()]: faker.number.int({ min: 1 }) },
        ],
      });
      newRecipe.save();
    }
  })
  .catch((err) => console.log(err));
