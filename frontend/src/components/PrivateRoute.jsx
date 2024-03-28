import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to={redirectTo} /> : Component;
};
