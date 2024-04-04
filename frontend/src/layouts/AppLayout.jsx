import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

export default function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { data } = await logout();
    if (data.success) navigate("/");
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
