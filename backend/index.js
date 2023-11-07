const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const { MongoClient } = require("mongodb");


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
env = process.env

const uri = env['ATLAS_URI'];

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('primary');
    const movies = database.collection('recipes');

    const query = { title: 'Pizza with Pumpkin' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
