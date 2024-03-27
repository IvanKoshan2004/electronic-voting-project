import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Cookies from "js-cookie";
import { logout } from "../api/auth";

export default function AppLayout() {
  const { checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const cookies = Cookies.get("user");

  if (!checkAuth(cookies)) {
    return <Navigate to="/auth/login" />;
  }

  const handleLogout = async () => {
    const res = await logout();
    console.log(res.message);
    navigate("/");
  };

  return (
    <div>
      App layout hi there
      {checkAuth(cookies) ? (
        <button onClick={handleLogout} type="button">
          Logout
        </button>
      ) : null}
      <Outlet />
    </div>
  );
}
