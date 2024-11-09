import React, { createContext, useEffect, useState } from "react";
import { BE_ROUTES, STATUS } from "../utils";
import { clearToken, setToken } from "../utils/token";
import useMakeRequest from "../hooks/useMakeRequest";

const initialState = {
  id: "",
  username: "",
  full_name: "",
  district: "",
  party: "",
  borough: "",
  first_name: "",
  last_name: "",
};

export const UserContext = createContext({ ...initialState });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { ...initialState };
  });

  const { makeRequest } = useMakeRequest();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  });

  const login = async (userData) => {
    const data = await makeRequest(BE_ROUTES.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (data.status === STATUS.FAIL) return data;

    setToken(data.token);
    const responseUser = await makeRequest(BE_ROUTES.COMPLAINTS.CURRENT_USER);
    setUser(responseUser);
    return { status: STATUS.SUCCESS };
  };
  const logout = () => {
    // :P:: TODO: call endoint?
    setUser({ ...initialState });
    clearToken();
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
