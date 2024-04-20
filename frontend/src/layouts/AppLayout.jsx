import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutItem } from "../components/LayoutItem";
import { logout } from "../api/auth";
import css from "././AppLayout.module.css";

export default function AppLayout() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  console.log(pathname);

  const handleLogout = async () => {
    const { data } = await logout();
    if (data.success) navigate("/");
  };

  return (
    <div className={css.backdrop}>
      <div className={css.container}>
        <nav className={css.menu}>
          <LayoutItem isActive={pathname.includes("ballots")} route="/app/ballots" title="My Ballots" inTop />
          <LayoutItem
            isActive={pathname.includes("available-votings")}
            route="/app/available-votings"
            title="Available Votings"
          />
          <LayoutItem isActive={pathname.includes("ended-votings")} route="/app/ended-votings" title="Ended Votings" />
          <LayoutItem
            isActive={pathname.includes("create-voting")}
            route="/app/create-voting"
            title="Create new voting"
          />
          <LayoutItem title="Log out" onClick={handleLogout} />
        </nav>
        <div className={css.content}>
          <div className={css.contentContainer}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
