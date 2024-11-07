import React from "react";

import Login from "./views/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./views/Home";
import { ROUTES } from "./utils";

const routes = [
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.HOME,
    element: <ProtectedRoute component={Home} />,
  },
];

export default routes;
