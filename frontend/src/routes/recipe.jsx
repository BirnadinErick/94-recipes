import { useLoaderData } from "react-router-dom";

export default function Recipe() {
  const { recipe } = useLoaderData();
  return (
    <section>
      <h1>{recipe.title}</h1>
      <p>Prep time: {recipe.ptime}</p>

      <div>
        <h3>Ingredients</h3>
        {recipe.ing.map((i, j) => (
          <p key={j}>
            <span>{Object.keys(i)[0]}</span>:{" "}
            <span>{i[Object.keys(i)[0]]}</span>
          </p>
        ))}
      </div>

      <div>{recipe.body}</div>
    </section>
  );
}
