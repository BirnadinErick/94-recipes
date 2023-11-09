import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  constructIngredientsString,
  createIngredients,
} from "../utils/ingrediants";

export default function EditRecipe() {
  // since user decided to edit the recipe, state of the datastore
  // is stale in the user POV!
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [pTime, setpTime] = useState("");
  const [ing, setIng] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const [dummyState, setDummyState] = useState("");

  const fetchStaleRecipe = async () => {
    const res = await axios.get(`http://localhost:2003/v1/recipe/${slug}`);
    if (res.status === 200) {
      console.log("retrieved stale data, syncing UI");

      const recipe = res.data;
      setTitle(recipe.title);
      setpTime(recipe.ptime);
      setIng(constructIngredientsString(recipe.ing));
      setBody(recipe.body);

      console.log("UI in sync");
    } else {
      console.error("retrieving the stale recipe failed.");
    }
  };

  useEffect(() => {
    setDummyState("dummy updated");
    console.log(dummyState);
    fetchStaleRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dummyState]);

  return (
    <section className="mt-4 px-16 relative">
      <h1 className="text-3xl font-bold">Edit Recipe</h1>
      <div>
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();

            const parsedIngredients = createIngredients(ing);

            axios
              .put(`http://localhost:2003/v1/recipe/${slug}`, {
                title,
                body,
                ptime: pTime,
                ing: parsedIngredients,
              })
              .then((res) => {
                if (res.status === 202) {
                  return res.data;
                }
                console.error("Recipe not created!");
              })
              .then((data) => {
                console.info(data);
                navigate(`/recipes/${slug}`);
              });
          }}
        >
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title for the yummy"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            Update
          </button>
        </form>
      </div>
    </section>
  );
}
