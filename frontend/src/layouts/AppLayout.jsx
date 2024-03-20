import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function AppLayout() {
  const token = "";
  const { checkAuth } = useContext(AuthContext);
  const [isAuthUrl, setIsAuthUrl] = useState(null);

  useEffect(() => {
    const navigateURL = checkAuth(token);
    if (navigateURL) {
      setIsAuthUrl(navigateURL);
    }
  }, [token, checkAuth]);
  if (isAuthUrl) {
    return <Navigate to={isAuthUrl} />;
  }
  console.log(isAuthUrl);
  return (
    <div>
      App layout hi there
      <Outlet />
    </div>
  );
}
