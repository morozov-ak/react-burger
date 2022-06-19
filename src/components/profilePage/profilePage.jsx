import React, { useCallback, useEffect } from "react";
import styles from "./profilePage.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_NAME_PROFILE,
  SET_EMAIL_PROFILE,
  getUserInfoReducer,
  SET_PASSWORD_PROFILE,
  CLEAR_PROFILE,
  changeUserInfoReducer,
  logoutReducer,
} from "../../services/actions";
import { NavLink } from "react-router-dom";

export function ProfilePage() {
  const { name, email, password } = useSelector((state) => {
    return {
      name: state.profileForm.name,
      email: state.profileForm.email,
      password: state.profileForm.password,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfoReducer());
    return () => {
      dispatch({ type: CLEAR_PROFILE });
    };
  }, [dispatch]);

  const handleNameChange = useCallback(
    (event) => {
      dispatch({
        type: SET_NAME_PROFILE,
        payload: event.target.value,
      });
    },
    [dispatch]
  );

  const handleEmailChange = useCallback(
    (event) => {
      dispatch({
        type: SET_EMAIL_PROFILE,
        payload: event.target.value,
      });
    },
    [dispatch]
  );

  const handlePasswordChange = useCallback(
    (event) => {
      dispatch({
        type: SET_PASSWORD_PROFILE,
        payload: event.target.value,
      });
    },
    [dispatch]
  );

  const handleChangeField = useCallback(
    (event) => {
      dispatch(
        changeUserInfoReducer({
          name,
          email,
          ...(password ? { password: password } : {}),
        })
      );
    },
    [dispatch, name, email, password]
  );

  const handleLogout = useCallback(() => {
    dispatch(logoutReducer());
  }, [dispatch]);

  return (
    <div className={styles.content}>
      <section className={`${styles.menu}`}>
        <NavLink
          to="/profile"
          className={`text text_color_inactive text_type_main-medium ${styles.link}`}
          activeClassName={styles.link_active}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/history"
          className={`text mt-8 text_color_inactive text_type_main-medium ${styles.link}`}
          activeClassName={styles.link_active}
        >
          История заказов
        </NavLink>
        <NavLink
          to="/exit"
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
      <section className={styles.inputs}>
        <Input
          type={"text"}
          placeholder="Имя"
          onChange={handleNameChange}
          icon={"EditIcon"}
          value={name}
          name={"name"}
          error={false}
          onIconClick={handleChangeField}
          errorText={"Ошибка"}
          size={"default"}
        />
        <div className="mt-6">
          <Input
            type={"text"}
            placeholder="Логин"
            onChange={handleEmailChange}
            icon={"EditIcon"}
            value={email}
            name={"email"}
            error={false}
            onIconClick={handleChangeField}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>

        <div className="mt-6">
          <Input
            type={"password"}
            placeholder="Пароль"
            onChange={handlePasswordChange}
            icon={"EditIcon"}
            value={password}
            name="password"
            error={false}
            onIconClick={handleChangeField}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
      </section>
    </div>
  );
}
