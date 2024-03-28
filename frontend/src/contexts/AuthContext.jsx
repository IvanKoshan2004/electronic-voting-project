import Cookies from "js-cookie";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const checkAuth = () => {
    const user = Cookies.get("user");
    if (!user) {
      return false;
    }
    setUser(JSON.parse(user));
    return true;
  };

  return <AuthContext.Provider value={{ checkAuth, user, setUser }}>{children}</AuthContext.Provider>;
};
