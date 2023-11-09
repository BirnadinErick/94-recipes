import { useLoaderData } from "react-router-dom";

export default function Recipe() {
  const { recipe } = useLoaderData();
  return (
    <section className="px-16 py-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold uppercase">{recipe.title}</h1>
        <p className="text-gray-600">Prep time: {recipe.ptime}</p>
      </div>

      <hr />

      <div className="my-4">
        <h3 className="text-xl">Ingredients</h3>
        {recipe.ing.map((i, j) => (
          <p key={j} className="text-gray-600">
            <span>{Object.keys(i)[0]}</span>:{" "}
            <span>{i[Object.keys(i)[0]]}</span>
          </p>
        ))}
      </div>

      <div className="mt-12 font-serif text-lg tracking-wide leading-relaxed">
        {recipe.body}
      </div>
    </section>
  );
}
