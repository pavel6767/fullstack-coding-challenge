import React, { createContext, useState } from "react";
import { STATUS } from "../utils";
import { clearToken, setToken } from "../utils/token";
import { useMakeRequest } from "./useMakeRequest";

const initialState = {
  id: "",
  user: "",
  full_name: "",
  district: "",
  party: "",
  borough: "",
};

export const UserContext = createContext({ ...initialState });

export const UserProvider = ({ children }) => {
  const { makeRequest } = useMakeRequest();
  const [user, setUser] = useState(initialState);

  const login = async (userData) => {
    const data = await makeRequest("/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (data.status === STATUS.FAIL) {
      // :P:: TODO: add error toast
      return data;
    }

    setToken(data.token);
    // :P:: TODO: make request to get info on self
  };
  const logout = () => {
    setUser({ ...initialState });
    clearToken();
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
