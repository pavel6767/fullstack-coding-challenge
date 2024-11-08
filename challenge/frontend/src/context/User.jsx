import React, { createContext, useEffect, useState } from "react";
import { LOGIN_MESSAGES, STATUS } from "../utils";
import { clearToken, setToken } from "../utils/token";
import makeRequest from "../utils/makeRequest";

const initialState = {
  id: "",
  username: "",
  full_name: "",
  district: "",
  party: "",
  borough: "",
};

export const UserContext = createContext({ ...initialState });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { ...initialState };
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  });

  const login = async (userData) => {
    const data = await makeRequest("/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (data.status === STATUS.FAIL) {
      return {
        ...data,
        message: LOGIN_MESSAGES[data.type],
      };
    }

    setToken(data.token);
    const responseUser = await makeRequest("/api/complaints/current-user");
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
