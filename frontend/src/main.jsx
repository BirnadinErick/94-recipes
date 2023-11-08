import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import ErrorPage from "./components/Error";
import SignUp from "./routes/signin";
import signInAction from "./utils/signInAction";
import LogIn from "./routes/login";
import { logInFormAction } from "./utils/logInAction";

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
        action: logInFormAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
