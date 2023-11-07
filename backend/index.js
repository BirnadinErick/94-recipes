var dotenv = require('dotenv')
var dotenvExpand = require('dotenv-expand')

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
