import React, {  FunctionComponent, useCallback } from "react";
import styles from "./profileSidebar.module.css";

import {

  logoutReducer,
} from "../../services/actions";
import { NavLink } from "react-router-dom";
import { useDispatch } from "../../services/hooks";




export const ProfileSidebar:FunctionComponent = () => {

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logoutReducer()  as any);
  }, [dispatch]);


    return (
        <section className={`${styles.menu}`}>
          <NavLink
            to="/profile"
            exact
            className={`text text_color_inactive text_type_main-medium ${styles.link}`}
            activeClassName={styles.link_active}
          >
            Профиль
          </NavLink>
          <NavLink
            exact
            to="/profile/orders"
            className={`text mt-8 text_color_inactive text_type_main-medium ${styles.link}`}
            activeClassName={styles.link_active}
          >
            История заказов
          </NavLink>
          <NavLink
            exact
            to="/"
            onClick={handleLogout}
            className={`text mt-8 text_color_inactive text_type_main-medium ${styles.link}`}
            activeClassName={styles.link_active}
          >
            Выход
          </NavLink>
          <p
            className={`text text_color_inactive mt-20 text_type_main-default ${styles.helper}`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </section>
    );
  

}
