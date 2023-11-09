import { useState } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RecipeCard({ recipe }) {
  const [isDeleteOpen, setDeleteOpen] = useState();

  return (
    <div className="bg-gradient-to-b p-6 max-w-fit my-2 from-amber-200 to-amber-50">
      <Link to={recipe.slug}>
        <h3 className="text-xl font-bold">{recipe.title}</h3>
      </Link>
      <p className="text-gray-700 lowercase">Prep Time: {recipe.ptime}</p>
      <div className="mt-3 border border-amber-900/60 rounded-sm">
        <Link
          to={`/edit-recipe/${recipe.slug}`}
          className="rounded-sm py-2 px-4 "
        >
          Edit
        </Link>
        <button
          className="rounded-tr-sm rounded-br-sm py-2 px-4 bg-pink-400"
          onClick={() => {
            setDeleteOpen(true);
          }}
        >
          Delete
        </button>
      </div>

      <ReactModal isOpen={isDeleteOpen} ariaHideApp={false}>
        <div className="flex flex-col justify-center items-center h-full space-y-4">
          <h2 className="text-3xl font-bold">Delete recipe {recipe.title}?</h2>
          <div className="flex justify-start items-center space-x-4">
            <button
              className="bg-slate-300 py-2 px-6 rounded-sm"
              onClick={() => setDeleteOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 px-6 py-2 rounded-sm text-black/70 font-bold"
              onClick={() => {
                const res = axios
                  .delete(`http://localhost:2003/v1/recipe/${recipe.slug}`)
                  .then((res) => {
                    if (res.status === 202) {
                      console.log(res.data);
                      document.location.reload();
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
          </div>
        </div>
      </ReactModal>
    </div>
  );
}
