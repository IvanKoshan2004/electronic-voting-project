import { createContext, useState, useCallback } from "react";
import { currentAuth } from "../api/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  const checkAuth = useCallback(async () => {
    setHasFetched(false);
    const { data } = await currentAuth();
    if (!data.success) {
      setUser(null);
      setHasFetched(true);
      return;
    }
    setUser(data.user);
    setHasFetched(true);
  }, []);

  return <AuthContext.Provider value={{ checkAuth, user, hasFetched }}>{children}</AuthContext.Provider>;
};
