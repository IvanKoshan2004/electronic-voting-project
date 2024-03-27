import { createContext } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const checkAuth = cookie => {
    if (!cookie) {
      return false;
    }
    return true;
  };

  return <AuthContext.Provider value={{ checkAuth }}>{children}</AuthContext.Provider>;
};
