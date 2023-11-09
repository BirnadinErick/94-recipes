import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-amber-200 p-6 max-w-fit my-2">
      <Link to={recipe.slug}>
        <h3 className="text-xl">{recipe.title}</h3>
      </Link>
      <p className="text-gray-700">Prep Time: {recipe.ptime}</p>
      <div className="space-x-3 mt-3">
        <Link
          to={`/edit-recipe/${recipe.slug}`}
          className="rounded-sm p-2 bg-amber-400"
        >
          Edit
        </Link>
        <button className="rounded-sm p-2 bg-pink-400">Delete</button>
      </div>
    </div>
  );
}
