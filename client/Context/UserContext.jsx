import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({ userId: "", userName: "" });

  const setUser = (userId, userName) => {
    setUserData({ userId, userName });
  };

  return (
    <UserContext.Provider value={{ userData, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
