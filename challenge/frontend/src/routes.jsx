import React from "react";

import Login from "./views/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./views/Home";

export default [
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
