import React, { ChangeEvent, FormEvent, memo, useCallback, useEffect } from "react";
import styles from "./loginPage.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_LOGIN,
  loginReducer,
  SET_EMAIL_LOGIN,
  SET_PASSWORD_LOGIN,
  TOGGLE_PASSWORD_LOGIN,
} from "../../services/actions";
import { Link, Redirect, useLocation } from "react-router-dom";
import { TStore } from "../../services/reducers";

export const LoginPage = memo(() => {
  const { email, password, isHidePassword, isAuthenticated } = useSelector(
    (state:TStore) => {
      return {
        email: state.loginForm.email,
        password: state.loginForm.password,
        isHidePassword: state.loginForm.isHidePassword,
        isAuthenticated: state.auth.isAuthenticated,
      };
    }
  );

  const dispatch = useDispatch();

  const location:any = useLocation();

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_LOGIN });
    };
  }, [dispatch]);

  const handleEmailChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: SET_EMAIL_LOGIN, payload: event.target.value });
    },
    [dispatch]
  );

  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: SET_PASSWORD_LOGIN, payload: event.target.value });
    },
    [dispatch]
  );

  const handleHidePasswordChange = useCallback(() => {
    dispatch({ type: TOGGLE_PASSWORD_LOGIN });
  }, [dispatch]);

  const handleLogin = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(loginReducer({ email, password }) as any);
  }, [dispatch, email, password]);

  if (isAuthenticated) {
    return <Redirect to={location.state?.from.pathname || "/"} />;
  }

  return (
    <section className={styles.content}>
      <p className="text text_type_main-medium mt-10 mb-5">Вход</p>
      <form onSubmit={handleLogin} className={styles.form}>
        <Input
          type={"text"}
          placeholder="E-mail"
          onChange={handleEmailChange}
          value={email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <div className="mt-6">
          <Input
            type={isHidePassword ? "password" : "text"}
            placeholder="Password"
            onChange={handlePasswordChange}
            icon={"ShowIcon"}
            value={password}
            name="password"
            error={false}
            onIconClick={handleHidePasswordChange}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className="mt-6">
          <Button type="primary" size="medium" >
            Войти
          </Button>
        </div>
      </form>
      
      <div className={`mt-20 ${styles.helper_text}`}>
        <p className="text text_color_inactive text_type_main-default mr-2">
          Вы — новый пользователь?
        </p>
        <Link
          to="/register"
          className={`text text_color_accent text_type_main-default ${styles.link}`}
        >
          Зарегистрироваться
        </Link>
      </div>
      <div className={`mt-4 ${styles.helper_text}`}>
        <p className="text text_color_inactive text_type_main-default mr-2">
          Забыли пароль?
        </p>
        <Link
          to="/forgot-password"
          className={`text text_color_accent text_type_main-default ${styles.link}`}
        >
          Восстановить пароль
        </Link>
      </div>
    </section>
  );
});
