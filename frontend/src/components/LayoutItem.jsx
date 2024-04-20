import { Link } from "react-router-dom";
import css from "./LayoutItem.module.css";

export const LayoutItem = ({ title = "", isActive = false, inTop = false, route = "", onClick = () => {} }) => {
  return (
    <Link onClick={onClick} to={route} className={`${isActive ? css.item_active : css.item} ${inTop && css.item_top}`}>
      <p className={css.item_text}>{title}</p>
    </Link>
  );
};
