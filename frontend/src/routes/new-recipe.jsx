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
    <section>
      <h2>New Recipe</h2>
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

          <button type="reset">clear everything</button>
          <button type="sumbit">add new recipe</button>
        </form>
      </div>
    </section>
  );
}
