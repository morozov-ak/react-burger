import React, { ChangeEvent, useCallback, useEffect } from "react";
import styles from "./registrationPage.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_NAME_REGISTRATION,
  SET_EMAIL_REGISTRATION,
  SET_PASSWORD_REGISTRATION,
  TOGGLE_PASSWORD_REGISTRATION,
  registerUserReducer,
  CLEAR_REGISTRATION,
} from "../../services/actions";
import { Link } from "react-router-dom";
import { TStore } from "../../services/reducers";

export function RegistrationPage() {
  const { name, email, password, isHidePassword } = useSelector((state:TStore) => {
    return {
      name: state.registrationForm.name,
      email: state.registrationForm.email,
      password: state.registrationForm.password,
      isHidePassword: state.registrationForm.isHidePassword,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_REGISTRATION });
    };
  }, [dispatch]);

  const handleNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: SET_NAME_REGISTRATION,
        payload: event.target.value,
      });
    },
    [dispatch]
  );

  const handleEmailChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: SET_EMAIL_REGISTRATION,
        payload: event.target.value,
      });
    },
    [dispatch]
  );

  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: SET_PASSWORD_REGISTRATION,
        payload: event.target.value,
      });
    },
    [dispatch]
  );

  const handleHidePasswordChange = useCallback(() => {
    dispatch({ type: TOGGLE_PASSWORD_REGISTRATION });
  }, [dispatch]);

  const handleRegisterUser = useCallback(() => {
    dispatch(registerUserReducer({ name, email, password })as any);
  }, [dispatch, name, email, password]);

  return (
    <section className={styles.content}>
      <p className="text text_type_main-medium mt-10 mb-5">Регистрация</p>
      <form onSubmit={handleRegisterUser} className={styles.form}>
        <Input
          type={"text"}
          placeholder="Имя"
          onChange={handleNameChange}
          value={name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <div className="mt-6">
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
        </div>

        <div className="mt-6">
          <Input
            type={isHidePassword ? "password" : "text"}
            placeholder="Пароль"
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
          Уже зарегистрированы?
        </p>
        <Link
          to="/login"
          className={`text text_color_accent text_type_main-default ${styles.link}`}
        >
          Войти
        </Link>
      </div>
    </section>
  );
}
