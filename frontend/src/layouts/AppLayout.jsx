import { Outlet, useNavigate } from "react-router-dom";
import { MenuItem } from "../components/MenuItem";
import { logout } from "../api/auth";
import css from "././AppLayout.module.css";
import { Toaster } from "react-hot-toast";

export default function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { data } = await logout();
    if (data.success) navigate("/");
  };

  return (
    <div className={css.backdrop}>
      <div className={css.container}>
        <nav className={css.menu}>
          <MenuItem route="/app/ballots" title="My Ballots" />
          <MenuItem route="/app/available-votings" title="Available Votings" />
          <MenuItem route="/app/ended-votings" title="Ended Votings" />
          <MenuItem route="/app/create-voting" title="Create new voting" />
          <MenuItem title="Log out" onClick={handleLogout} />
        </nav>
        <div className={css.content}>
          <div className={css.contentContainer}>
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
