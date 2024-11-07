import React, { createContext, useState } from "react";
import { NETWORK_ERROR_TYPES, STATUS } from "../utils";
import { clearToken, setToken } from "../utils/token";
import makeRequest from "../utils/makeRequest";

const initialState = {
  id: "",
  user: "",
  full_name: "",
  district: "",
  party: "",
  borough: "",
};

export const UserContext = createContext({ ...initialState });

const MESSAGES = {
  [NETWORK_ERROR_TYPES.NOT_OK]:
    "Please double check username and password or contact Support",
  [NETWORK_ERROR_TYPES.ERROR]: "Error, please contact support",
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const login = async (userData) => {
    const data = await makeRequest("/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (data.status === STATUS.FAIL) {
      return {
        ...data,
        message: MESSAGES[data.type],
      };
    }

    setToken(data.token);
    return { status: STATUS.SUCCESS };
    // :P:: TODO: make request to get info on self
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
