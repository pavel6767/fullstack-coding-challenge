import React, { createContext, useState } from "react";

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
  const [user, setUser] = useState(initialState);
  const login = (userData) => setUser(userData);
  const logout = () => setUser({ ...initialState });
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
