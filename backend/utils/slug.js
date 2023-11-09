/* Get slug value from title
 * Creates a URL-friendly slug from a given string.
 * Dead simple slug generatin algorithm, that
 * - removes spaces, non-alphanumeric
 * - reduces multiple hyphens to one
 * - converts to lowercase from alternating case
 */
function getSlug(title) {
  let slug = title.toLowerCase();
  slug = slug.replace(/\s/g, "-");
  slug = slug.replace(/[^a-z0-9\-]/g, "");
  slug = slug.replace(/-+/g, "-");
  slug = slug.replace(/^\-|-$/g, "");

  return slug;
}

exports.getSlug = getSlug;
