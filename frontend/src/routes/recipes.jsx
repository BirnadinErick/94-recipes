import { useLoaderData } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
  const { recipes } = useLoaderData();
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
