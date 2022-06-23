import React, { useCallback, useEffect, useState } from "react";
import styles from "./forgotPasswordPage.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { CLEAR_FORGOT, resetPasswordReducer } from "../../../services/actions";
import { useDispatch } from "react-redux";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handleForgotPassword = useCallback(() => {
    dispatch(
      resetPasswordReducer(email, () => {
        history.push("/reset-password");
      })
    );
  }, [dispatch, email, history]);

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_FORGOT });
    };
  }, [dispatch]);

  return (
    <section className={styles.content}>
      <p className="text text_type_main-medium mt-10 mb-5">
        Восстановление пароля
      </p>

      <div className="mt-6">
        <Input
          type={"text"}
          placeholder="E-mail"
          onChange={handleChange}
          value={email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>

      <div className="mt-6">
        <Button type="primary" size="medium" onClick={handleForgotPassword}>
          Восстановить
        </Button>
      </div>
      <div className={`mt-20 ${styles.helper_text}`}>
        <p className="text text_color_inactive text_type_main-default mr-2">
          Вспомнили пароль?
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
