import { useLoaderData } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useDispatch, useSelector } from "react-redux";
import { bulkAdd } from "../utils/state/globalSlice";

export default function Recipes() {
  const { recipesRetrieved } = useLoaderData();
  const dispatch = useDispatch();
  dispatch(bulkAdd(recipesRetrieved));
  const recipes = useSelector((state) => state.global.recipes);

  return (
    <section className="mt-4 px-16">
      <h1 className="text-3xl font-bold">Recipes.</h1>
      <div className="my-4 grid grid-cols-6">
        {recipes.map((r, i) => (
          <RecipeCard key={i} recipe={r} />
        ))}
      </div>
    </section>
  );
}
