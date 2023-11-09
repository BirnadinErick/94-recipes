import { Link } from "react-router-dom";
import AddIcon from "./AddIcon";
import GoIcon from "./GoIcon";
import ReadIcon from "./ReadIcon";

export default function AltHome() {
  return (
    <section className="my-8">
      <div className="flex flex-col justify-start items-center w-full">
        <h2 className="text-3xl font-bold">Hey There, it{"'"}s me the BE!</h2>
        <div className="flex justify-between items-center space-x-8 my-4">
          <Link
            to="/recipes"
            className="flex justify-start items-center space-x-2 bg-amber-200 px-6 py-2 rounded-sm"
          >
            <ReadIcon />
            <p>Read Your Recipes</p>
          </Link>

          <Link
            to="/new-recipe"
            className="flex justify-start items-center space-x-2 bg-amber-300 px-6 py-2 rounded-sm"
          >
            <AddIcon />
            <p>Add some recipes</p>
          </Link>
        </div>
        <Link
          to="https://birnadine.bio.link/"
          className="flex justify-start items-center space-x-2 bg-teal-100 px-6 py-2 rounded-sm"
        >
          <GoIcon />
          <p>Get to know me</p>
        </Link>
      </div>
    </section>
  );
}
