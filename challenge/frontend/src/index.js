import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import * as serviceWorker from "./serviceWorker";
import routes from "./routes";
import { UserProvider } from "./context/User";

const router = createBrowserRouter(routes);

ReactDOM.render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
