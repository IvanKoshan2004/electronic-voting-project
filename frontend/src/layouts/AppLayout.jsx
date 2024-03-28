import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

export default function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await logout();
    if (res.success) navigate("/");
  };

  return (
    <div>
      App layout hi there
      <button onClick={handleLogout} type="button">
        Logout
      </button>
      <Outlet />
    </div>
  );
}
