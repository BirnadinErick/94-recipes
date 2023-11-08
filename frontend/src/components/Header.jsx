import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useSelector } from "react-redux";

export default function Header() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const uname = useSelector((state) => state.auth.user.uname);
  return (
    <header className="flex justify-between px-4">
      <div className="flex justify-start items-center space-x-4">
        <div className="flex justify-start items-center space-x-2">
          <img className="h-12" src={logo} alt="94Recipes logo" />
          <h2>94Recipes</h2>
        </div>
        <p className="text-black/30">/</p>
        <h4>Username</h4>
      </div>
      <nav className="flex justify-center items-center space-x-4">
        <ul className="flex space-x-4 items-baseline justify-end cursor-pointer select-none">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">{isAuth ? uname : "Log In"}</Link>
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

        <button>Add new Recipe</button>
      </nav>
    </header>
  );
}
