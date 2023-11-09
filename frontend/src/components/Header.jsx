import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useSelector } from "react-redux";

export default function Header() {
  const isAuth = useSelector((state) => state.global.isAuth);
  const uname = useSelector((state) => state.global.user.uname);

  return (
    <header className="flex justify-between px-4 py-2 bg-amber-50">
      <div className="flex justify-start items-center space-x-4">
        <div className="flex justify-start items-center space-x-2">
          <img className="h-12" src={logo} alt="94Recipes logo" />
          <h2>94Recipes</h2>
        </div>
        {isAuth && (
          <>
            <p className="text-black/30">/</p>
            <h4>{uname}</h4>
          </>
        )}
      </div>
      <nav className="flex justify-center items-center space-x-4">
        <ul className="flex space-x-4 items-baseline justify-end cursor-pointer select-none">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {/* TODO: logout if isAuth */}
            <Link to="/login">{isAuth ? "Log Out" : "Log In"}</Link>
          </li>
          <li
            onClick={() => {
              // programatically trigger a full page reload
              document.location.reload();
            }}
          >
            Refresh
          </li>
        </ul>

        <Link to="/new-recipe">Add new Recipe</Link>
      </nav>
    </header>
  );
}
