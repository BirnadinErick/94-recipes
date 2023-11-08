import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import ErrorPage from "./components/Error";
import SignUp from "./routes/signin";
import signInAction from "./utils/signInAction";
import LogIn from "./routes/login";
import { Provider } from "react-redux";
import store from "./utils/state/store";
import Recipes from "./routes/recipes";
import recipesLoader from "./utils/recipesLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
        action: signInAction,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/recipes",
        element: <Recipes />,
        loader: recipesLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
