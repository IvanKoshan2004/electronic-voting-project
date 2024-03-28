import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children, redirectTo = "/auth/login" }) => {
  const { user, hasFetched, checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasFetched) {
      checkAuth();
      return;
    }
    if (!user) {
      navigate(redirectTo);
    }
  }, [user, hasFetched, navigate, redirectTo, checkAuth]);

  return children;
};
