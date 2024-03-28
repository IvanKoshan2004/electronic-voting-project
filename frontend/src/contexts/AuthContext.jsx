import { createContext, useEffect, useState, useCallback } from "react";
import { currentAuth } from "../api/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkAuth = useCallback(async () => {
    const { data } = await currentAuth();

    console.log(data);
    if (!data.success) {
      setUser(null);
    }
    setUser(data.user);
  }, []);

  useEffect(() => {
    async function check() {
      if (!user) {
        await checkAuth();
      }
    }
    check();
  }, [checkAuth, user]);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
