const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const express = require("express");
const userController = require("./controllers/user");
const recipeController = require("./controllers/recipe");
const driverDB = require("./utils/db");
const bodyParserMid = require("body-parser");

console.info(`[94Recipes API] booting...`);
console.debug("[94Recipes API] parsing runtime variables...");
/* WHY ENVVARS?
 * do this early as possible to bootstrap any variables
 * server is configured using the env vars
 * cmd lines args are not considered as this approach is easy to
 * scale in automated way. And, by this code documents itself,
 * e.g. args[0] is better than env['PORT']
 * Later is self-explanatory.
 */
var env = dotenv.config();
dotenvExpand.expand(env);

// alias to de-clutter the source listings
env = process.env;

const DB_URI = env["ATLAS_URI"] || process.exit(1); // if not specified, unrecoverable error
console.debug("[94Recipes API] datastore: ATLAS");

const DB_NAME = env["ATLAS_NAME"] || process.exit(1); // if not specified, unrecoverable error
console.debug(`[94Recipes API] datastore name: ${DB_NAME}`);

const PORT = env["PORT"] ? env["PORT"] : 2003;
console.debug(`[94Recipes API] port to listen ${PORT}`);

const USER_RESOURCE_PATH = "/v1/user";
const RECIPE_RESOURCE_PATH = "/v1/recipe";
console.debug(`[94Recipes API] user resource path ${USER_RESOURCE_PATH}`);

// intiate atlas driver
const atlas = driverDB.initDB(DB_URI, DB_NAME);
console.debug("[94Recipes API] ATLAS intialized!");

// intialize app
const app = express();

/* Boady Parser
 * this middleware, takes a request and parses
 * its body. It is predetermined that bodies are
 * JSON strings.
 */
app.use(bodyParserMid.json());
console.debug("[94Recipes API] Body JSON parser chained!");

/* CORS Patch
 * since backend doesn't serve frontend, CORS need
 * to be taken into account. I have been permissive
 * but not a good idea to open up to the world.
 *
 * During production, Origin should be limited and
 * Credentials should be taken care, if let as it is now.
 */
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "3600",
  });

  // Browser will do a preflight if the egress' ORIGIN
  // is not as same as the `document` ORIGIN. So,we handle
  // it here, since OPTIONS for each route would be tedious!
  if (req.method === "OPTIONS") {
    // preflights (verb OPTIONS) should not carry a body,
    // so, 204 (No Content) is set as status and responded.
    res.sendStatus(204);
  } else {
    // this is request for the required function of the app,
    // so we proceed.
    next();
  }
});
console.debug("[94Recipes API] CORS patch chained!");

/* Routes
 * Using psuedo-MVC pattern.
 * method on `app` is the Presentation layer verbs;
 * method on `xController` is the Data layer verbs.
 *
 * All routes return JSON response. No errors are thrown,
 * errors are indicated with status code and message is
 * returned as JSON object property `msg`
 *
 * In the MVC manner, V is marshalled with JSON representation.
 *
 * Instead of global state, driveDB (`atlas` here) is passed as arguments to the
 * handler(controller) function, which returns an asynchronous
 * controller. All the controllers are defined in the subdirectory--controllers.
 */
console.debug("[94Recipes API] configuring routes...");

// user
app.get(USER_RESOURCE_PATH + "/:uname", userController.getAUser(atlas.users)); // :uname unique identifier for a user
app.post(USER_RESOURCE_PATH, userController.createAUser(atlas.users));
// app.patch(USER_RESOURCE_PATH, userController.updateAUser);
// app.delete(USER_RESOURCE_PATH, userController.deleteAUser);
app.post(USER_RESOURCE_PATH + "/login", userController.logInUser(atlas.users));

// recipe
app.get(
  RECIPE_RESOURCE_PATH + "/:slug",
  recipeController.getARecipe(atlas.recipes)
);
app.get(RECIPE_RESOURCE_PATH, recipeController.getManyRecipes(atlas.recipes));
app.post(RECIPE_RESOURCE_PATH, recipeController.createARecipe(atlas.recipes));
app.put(
  RECIPE_RESOURCE_PATH + "/:slug",
  recipeController.updateARecipe(atlas.recipes)
); // !note this is PUT, not PATCH
app.delete(
  RECIPE_RESOURCE_PATH + "/:slug",
  recipeController.deleteARecipe(atlas.recipes)
);

console.info("[94Recipes API] configured routes.");

app.listen(PORT, () => {
  console.log(`[94Recipes API] listening on port ${PORT}`);
});

/* Clean Up
 * try to issue close syscall to open client,
 * though process might exit before call return,
 * OS context switch will clean up the stack afterwards
 * And, in epemereal VMs this is not to worry!
 */
process.on("SIGINT", async () => {
  console.log("exitting");
  atlas.client
    .close()
    .then("driverDB closed the client!")
    .catch("client failed to close!");
  process.exit(0);
});
