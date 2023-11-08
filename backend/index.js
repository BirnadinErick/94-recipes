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
var env = dotenv.config()
dotenvExpand.expand(env)

// alias to de-clutter the source listings
const DB_URI = env["ATLAS_URI"];
console.debug("[94Recipes API] datastore: ATLAS");

const DB_NAME = env["ATLAS_NAME"];
console.debug(`[94Recipes API] datastore name: ${DB_NAME}`);

const PORT = env["PORT"] ? env["PORT"] : 2003;
console.debug(`[94Recipes API] port to listen ${PORT}`);

const USER_RESOURCE_PATH = "/v1/user";
const RECIPE_RESOURCE_PATH = "/v1/recipe";
console.debug(`[94Recipes API] user resource path ${USER_RESOURCE_PATH}`);
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    await client.close();
  }
console.debug("[94Recipes API] configuring routes...");
console.info("[94Recipes API] configured routes.");

app.listen(PORT, () => {
  console.log(`[94Recipes API] listening on port ${PORT}`);
});
