import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";
import routes from "./routes";
import Providers from "./Providers";

import "./index.css";

const router = createBrowserRouter(routes);
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
