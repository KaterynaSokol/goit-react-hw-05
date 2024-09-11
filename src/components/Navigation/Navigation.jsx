import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <NavLink
        className={({ isActive }) => clsx(css.navLink, isActive && css.active)}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => clsx(css.navLink, isActive && css.active)}
        to="/movies"
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
