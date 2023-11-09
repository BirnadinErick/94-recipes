export function createIngredients(inIngredients) {
  const parsedIngredients = inIngredients.split("\n");
  const ingredients = [];

  parsedIngredients.forEach((ingredient) => {
    // !edge case
    // if user enters more than 1 amount or puts a whitespace
    // after ingredient amount, this might overflow
    // so, we ignore the rest using spread operator originally borrowed from rust std library
    // eslint-disable-next-line no-unused-vars
    const [name, amount, ..._] = ingredient.split(" ");
    const anIngredient = {};
    anIngredient[name] = amount;
    ingredients.push(anIngredient);
  });

  return ingredients;
}

/* Reverse engineer ingredients array to be used in textarea
 * Finally following Advent of Code 2022 is showing some usefulness. Bit of functional paradigm,
 * but hang on with me.
 *
 * We reduce the ingredients array from "" to what we want: \n seperated record tuple of `key<whitespace>value`.
 * But, if the acc is "" (this means this is the first line/iteration), we return our bare pattern ^ ;
 * If not, we return our bare pattern prefixed with acc and a \n (mostly <CR>). Finally we return
 * the reduced string to the calee.
 *
 * In case it is not clear, the alienn syntax `Object.keys(c)[0]` is to retrieve the key as a lexeme dynamically,
 * since key is arbitrary and `c[Object.keys(c)[0]]` means we retrieve the value using the key found in runtime
 * by stating in index-method.
 */
export function constructIngredientsString(ingredients) {
  return ingredients.reduce(
    (acc, c) =>
      acc === ""
        ? `${Object.keys(c)[0]} ${c[Object.keys(c)[0]]}`
        : acc + "\n" + `${Object.keys(c)[0]} ${c[Object.keys(c)[0]]}`,
    ""
  );
}
