import React from "react";

import Login from "./views/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./views/Home";

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
];

export default routes