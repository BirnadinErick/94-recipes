const bcryptLib = require("bcrypt");

/* Password utility
 * This module contains all the utility functions that work on
 * password or any secrets passed around but should not be
 * accessible except clients with suitable keys
 *
 * Algorithm used is bcrypt. Recommended by NSA. To increase the
 * strength increment the magnitude of the SALT_ROUNDS; unironically, app
 * will take more time to generate hash as well
 *
 * Functions are asynchrous to mitigate somewhat Timing attacks!
 */

const SALT_ROUNDS = 5; // why 5? that's my month of birth ;)

async function hashPlainText(passwd) {
  const hash = await bcryptLib.hash(passwd, SALT_ROUNDS);
  return hash;
}

async function validateHash(hash, plaintext) {
  const res = await bcryptLib.compare(plaintext, hash);

  // compare returns boolean
  return res;
}

exports.hash = hashPlainText;
exports.validateHash = validateHash;
