import { Link, useLocation } from "react-router-dom";
import css from "./LayoutItem.module.css";

export const MenuItem = ({ title = "", inTop = false, route = "", onClick = () => {} }) => {
  const { pathname } = useLocation();
  const isActive = pathname === route;
  return (
    <Link
      onClick={onClick}
      to={route}
      className={`${css.item} ${isActive && css.item_active} ${inTop && css.item_top}`}
    >
      <p className={css.item_text}>{title}</p>
    </Link>
  );
};
