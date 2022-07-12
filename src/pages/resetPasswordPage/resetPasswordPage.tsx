import React, { ChangeEvent, FormEvent, useCallback, useEffect } from "react";
import styles from "./resetPasswordPage.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  changePasswordReducer,
  CLEAR_RESET,
  SET_CODE_RESET,
  SET_PASSWORD_RESET,
  TOGGLE_PASSWORD_RESET,
} from "../../services/actions";
import { Link, useHistory } from "react-router-dom";
import { TStore } from "../../services/reducers";

export function ResetPasswordPage() {
  const { password, code, isHidePassword } = useSelector((state:TStore) => {
    return {
      password: state.resetPasswordForm.password,
      code: state.resetPasswordForm.code,
      isHidePassword: state.resetPasswordForm.isHidePassword,
    };
  });

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_RESET });
    };
  }, [dispatch]);

  const handleCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: SET_CODE_RESET, payload: event.target.value });
    },
    [dispatch]
  );

  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: SET_PASSWORD_RESET, payload: event.target.value });
    },
    [dispatch]
  );

  const handleHidePasswordChange = useCallback(() => {
    dispatch({ type: TOGGLE_PASSWORD_RESET });
  }, [dispatch]);

  const handleChangePassword = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      changePasswordReducer({ password, token: code }, () => {
        history.push("/login");
      }) as any
    );
  }, [dispatch, password, code, history]);

  return (
    <section className={styles.content}>
      <p className="text text_type_main-medium mt-10 mb-5">
        Восстановление пароля
      </p>
      <form onSubmit={handleChangePassword} className={styles.form}>
        <Input
          type={isHidePassword ? "password" : "text"}
          placeholder="Введите новый пароль"
          onChange={handlePasswordChange}
          icon={"ShowIcon"}
          value={password}
          name="password"
          error={false}
          onIconClick={handleHidePasswordChange}
          errorText={"Ошибка"}
          size={"default"}
        />
        <div className="mt-6">
          <Input
            type={"text"}
            placeholder="Введите код из письма"
            onChange={handleCodeChange}
            value={code}
            name={"code"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className="mt-6">
          <Button type="primary" size="medium" >
            Сохранить
          </Button>
        </div>
      </form>
      <div className={`mt-20 ${styles.helper_text}`}>
        <p className="text text_color_inactive text_type_main-default mr-2">
          Вспомнили пароль?
        </p>
        <Link to="/login">
          <p
            className={`text text_color_accent text_type_main-default ${styles.link}`}
          >
            Войти
          </p>
        </Link>
      </div>
    </section>
  );
}
