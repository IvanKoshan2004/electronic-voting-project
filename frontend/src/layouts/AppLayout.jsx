import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { logout } from "../api/auth";

export default function AppLayout() {
  const { checkAuth, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!checkAuth()) {
    return <Navigate to="/auth/login" />;
  }

  const handleLogout = async () => {
    const res = await logout();
    setUser(null);
    console.log(res.message);
    navigate("/");
  };

  return (
    <div>
      App layout hi there
      {checkAuth() ? (
        <button onClick={handleLogout} type="button">
          Logout
        </button>
      ) : null}
      <Outlet />
    </div>
  );
}
