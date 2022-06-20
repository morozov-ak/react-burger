import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./appHeader.module.css";

function AppHeader() {
  const { pathname } = useLocation();
  return (
    <header className={styles.appHeader}>
      <div className={styles.container}>
        <div className={styles.left_menu}>
          <NavLink
            className={`${styles.header_link}`}
            exact
            to="/"
            activeClassName={styles.header_link_active}
          >
            <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
            <p className={`text text_type_main-default ml-2`}>Конструктор</p>
          </NavLink>

          <NavLink
            className={`text text_type_main-default ml-10 ${styles.header_link}`}
            to="/profile/orders"
            activeClassName={styles.header_link_active}
          >
            <ListIcon
              type={pathname === "/profile/orders" ? "primary" : "secondary"}
            />
            <p className={`text text_type_main-default ml-2`}>Лента заказов</p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div>
          <NavLink
            className={`text text_type_main-default ${styles.header_link}`}
            exact
            to="/profile"
            activeClassName={styles.header_link_active}
          >
            <ProfileIcon
              type={pathname === "/profile" ? "primary" : "secondary"}
            />
            <p className={`text text_type_main-default ml-2`}>Личный кабинет</p>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
