import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

const initialState = {
  id: "",
  user: "",
  full_name: "",
  district: "",
  party: "",
  borough: "",
};
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
