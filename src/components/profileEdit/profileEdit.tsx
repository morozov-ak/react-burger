import React, { ChangeEvent, FormEvent, useCallback, useEffect } from "react";
import styles from "./profileEdit.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  SET_NAME_PROFILE,
  SET_EMAIL_PROFILE,
  getUserInfoReducer,
  SET_PASSWORD_PROFILE,
  CLEAR_PROFILE,
  changeUserInfoReducer,
  RESET_PROFILE,
} from "../../services/actions";
import { useDispatch, useSelector } from "../../services/hooks";

export function ProfileEdit() {
  const { name, email, password, isChanged, isLoaded } = useSelector(
    (state) => {
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

  if (name && email) {
    return (

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
    );
  }
  return null;
}
