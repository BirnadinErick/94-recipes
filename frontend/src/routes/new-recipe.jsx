import axios from "axios";
import { useState } from "react";
import { createIngredients } from "../utils/ingrediants";
import { useNavigate } from "react-router-dom";

export default function NewRecipe() {
  const [title, setTitle] = useState("");
  const [pTime, setpTime] = useState("");
  const [ing, setIng] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  return (
    <section className="mt-4 px-16 relative">
      <h1 className="text-3xl font-bold">New Recipes</h1>
      <div>
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            const parsedIngredients = createIngredients(ing);

            axios
              .post("http://localhost:2003/v1/recipe", {
                title,
                body,
                ptime: pTime,
                ing: parsedIngredients,
              })
              .then((res) => {
                if (res.status === 201) {
                  return res.data;
                }
                console.error("Recipe not created!");
              })
              .then((data) => {
                console.info(data);
                navigate("/recipes");
              });
          }}
        >
          <div className="flex justify-start items-baseline space-x-6">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title for the yummy"
              className="bg-gray-800 p-2 text-white block"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <input
              type="text"
              name="ptime"
              id="ptime"
              placeholder="Prep Time? (in minutes)"
              required
              value={pTime}
              onChange={(e) => setpTime(e.target.value)}
            />
          </div>
          <textarea
            name="ing"
            id="ing"
            cols="100"
            rows="10"
            placeholder="Ingredients. Each ingredient in newline, name and amount sepearated by a space. Example: flour 1kg"
            value={ing}
            onChange={(e) => setIng(e.target.value)}
          ></textarea>

          <textarea
            name="body"
            id="body"
            cols="100"
            rows="20"
            placeholder="Recipe for that yummy goes here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <button
            className="py-2 px-4 bg-amber-300 rounded-sm font-bold absolute bottom-16 right-16"
            type="sumbit"
          >
            Add New Recipe
          </button>
        </form>
      </div>
    </section>
  );
}
