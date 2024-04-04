import { createContext, useState, useCallback, useEffect } from "react";
import { currentAuth } from "../api/auth";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();

  useEffect(() => {
    setHasFetched(false);
  }, [location]);

  return <AuthContext.Provider value={{ checkAuth, user, hasFetched }}>{children}</AuthContext.Provider>;
};
