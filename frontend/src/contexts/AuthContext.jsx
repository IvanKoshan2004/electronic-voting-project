import { createContext } from "react";

export const AuthContext = createContext(null);
const user = {
  name: "Bobb",
};
export const AuthProvider = ({ children }) => {
  const checkAuth = token => {
    if (!token) {
      return "/auth/login";
    }
    return null;
  };
  return <AuthContext.Provider value={{ checkAuth, user }}>{children}</AuthContext.Provider>;
};
