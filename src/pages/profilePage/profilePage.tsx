import React, { ChangeEvent, FormEvent, useCallback, useEffect } from "react";
import styles from "./profilePage.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_NAME_PROFILE,
  SET_EMAIL_PROFILE,
  getUserInfoReducer,
  SET_PASSWORD_PROFILE,
  CLEAR_PROFILE,
  changeUserInfoReducer,
  logoutReducer,
  RESET_PROFILE,
} from "../../services/actions";
import { NavLink } from "react-router-dom";
import { TStore } from "../../services/reducers";

export function ProfilePage() {
  const { name, email, password, isChanged, isLoaded } = useSelector(
    (state:TStore) => {
      return {
        isLoaded: state.auth.isLoaded,
        isChanged: state.profileForm.isChanged,
        name: state.profileForm.name,
        email: state.profileForm.email,
        password: state.profileForm.password,
      };
    }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoaded) {
      dispatch(getUserInfoReducer() as any);
    }

    return () => {
      dispatch({ type: CLEAR_PROFILE });
    };
  }, [dispatch, isLoaded]);

  const handleNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: SET_NAME_PROFILE,
        payload: event.target.value,
      });
    },
    [dispatch]
  );

  const handleEmailChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: SET_EMAIL_PROFILE,
        payload: event.target.value,
      });
    },
    [dispatch]
  );

  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: SET_PASSWORD_PROFILE,
        payload: event.target.value,
      });
    },
    [dispatch]
  );

  const handleResetProfile = useCallback(() => {
    dispatch({
      type: RESET_PROFILE,
    });
  }, [dispatch]);

  const handleChangeField = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(
        changeUserInfoReducer({
          name,
          email,
          ...(password ? { password: password } : {}),
        }) as any
      );
    },
    [dispatch, name, email, password]
  );

  const handleLogout = useCallback(() => {
    dispatch(logoutReducer()  as any);
  }, [dispatch]);

  if (name && email) {
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
        <section className={styles.inputs} onSubmit={handleChangeField }>
          <form className={styles.form}>
            <Input
              type={"text"}
              placeholder="Имя"
              onChange={handleNameChange}
              icon={"EditIcon"}
              value={name}
              name={"name"}
              error={false}
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
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
            {isChanged && (
                <div className="mt-6">
                  <Button
                    type="primary"
                    size="medium"
                    
                  >
                    <p className={styles.button_text}>Сохранить</p>
                  </Button>
                </div>
            )}
          </form>
          
          {isChanged && (
              <div className="mt-6">
                <Button
                  type="primary"
                  size="medium"
                  onClick={handleResetProfile}
                >
                  <p className={styles.button_text}>Отмена</p>
                </Button>
              </div>
          )}
        </section>
      </div>
    );
  }
  return null;
}
