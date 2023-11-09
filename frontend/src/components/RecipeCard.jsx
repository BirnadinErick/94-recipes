import { useState } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RecipeCard({ recipe }) {
  const [isDeleteOpen, setDeleteOpen] = useState();

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
        <button
          className="rounded-sm p-2 bg-pink-400"
          onClick={() => {
            setDeleteOpen(true);
          }}
        >
          Delete
        </button>
      </div>

      <ReactModal isOpen={isDeleteOpen} ariaHideApp={true}>
        <h2>Delete this item?</h2>
        <button onClick={() => setDeleteOpen(false)}>Cancel</button>
        <button
          onClick={() => {
            const res = axios
              .delete(`http://localhost:2003/v1/recipe/${recipe.slug}`)
              .then((res) => {
                if (res.status === 202) {
                  console.log(res.data);
                  return true;
                } else {
                  console.error("something went wrong back there");
                  return false;
                }
              });

            if (res === true) {
              setDeleteOpen(false);
            } else {
              // indicate user, operation failed
              setDeleteOpen(false);
            }
          }}
        >
          Sure, Delete
        </button>
      </ReactModal>
    </div>
  );
}
