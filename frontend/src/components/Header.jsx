import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useSelector } from "react-redux";
import RefreshIcon from "./RefreshIcon";
import AddIcon from "./AddIcon";

export default function Header() {
  const isAuth = useSelector((state) => state.global.isAuth);
  const uname = useSelector((state) => state.global.user.uname);

  return (
    <header className="flex justify-between px-4 py-4 bg-gradient-to-b to-amber-50 from-amber-200">
      <div className="flex justify-start items-center space-x-4">
        <Link to="/">
          <div className="flex justify-start items-center space-x-2">
            <img className="h-12" src={logo} alt="94Recipes logo" />
            <h2 className="text-2xl font-bold font-mono">94Recipes</h2>
          </div>
        </Link>
        {isAuth && (
          <>
            <p className="text-black/30">/</p>
            <h4>{uname}</h4>
          </>
        )}
      </div>
      <nav className="flex justify-center items-center space-x-4">
        <ul className="flex space-x-4 items-center justify-end cursor-pointer select-none">
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
          <li>
            {/* TODO: logout if isAuth */}
            <Link to="/login">{isAuth ? "Log Out" : "Log In"}</Link>
          </li>
          <li
            className="flex justify-start items-center"
            onClick={() => {
              // programatically trigger a full page reload
              document.location.reload();
            }}
          >
            <div className="border border-amber-900 rounded-tl-md rounded-bl-md p-2">
              <RefreshIcon />
            </div>
            <div className="border border-amber-900 rounded-tr-md rounded-br-md py-2 px-4 border-l-0 text-amber-900 font-bold bg-amber-300">
              <Link to="/new-recipe">
                <div className="flex justify-start items-center space-x-1">
                  <AddIcon />
                  <p>Recipe</p>
                </div>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
