import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./appHeader.module.css";

function AppHeader() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.container}>
        <div className={styles.left_menu}>
          <a
            className={`text text_type_main-default ${styles.header_link}`}
            href="/"
          >
            <BurgerIcon type="primary" />
            <p className={`text text_type_main-default ml-2`}>Конструктор</p>
          </a>
          <a
            className={`text text_type_main-default ml-10 ${styles.header_link}`}
            href="ya.ru"
          >
            <ListIcon type="primary" />
            <p className={`text text_type_main-default ml-2`}>Лента заказов</p>
          </a>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div>
          <Link
            className={`text text_type_main-default ${styles.header_link}`}
            to="/profile"
          >
            <ProfileIcon type="primary" />
            <p className={`text text_type_main-default ml-2`}>Личный кабинет</p>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
