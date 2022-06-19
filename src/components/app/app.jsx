import React, { useEffect } from "react";
import NavigationPanel from "../appHeader/appHeader";
import styles from "./app.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import {
  fetchIngredientsReducer,
  RESET_ORDER,
} from "../../services/actions/bun";
import { ConstructorPage } from "../constructorPage/constructorPage";
import { ErrorPage } from "../errorPage/errorPage";
import { LoginPage } from "../loginPage/loginPage";
import { RegistrationPage } from "../registrationPage/registrationPage";
import { ForgotPasswordPage } from "../forgotPasswordPage/forgotPasswordPage";
import { ResetPasswordPage } from "../resetPasswordPage/resetPasswordPage";
import { ProfilePage } from "../profilePage/profilePage";
import { IngredientInfoPage } from "../ingredientInfoPage/ingredientInfoPage";
import { ProtectedRoute } from "../protectedRoute/protectedRoute";
import { getCookie } from "../../utils/getCookie";
import {
  SET_ERROR,
  SET_AUTHENTICATED,
  SET_COOKIE,
} from "../../services/actions";
import { getUserInfo } from "../../api/getUserInfo";
import { refreshCookie } from "../../api/refreshCookie";

function App() {
  const error = useSelector((state) => state.order.error);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("app render");
    getUserInfo()
      .then((res) => {
        if (res.success) {
          dispatch({ type: SET_AUTHENTICATED, payload: true });
        }
      })
      .catch((e) => {
        if (!e.success) {
          refreshCookie()
            .then((res) => {
              if (res.success) {
                dispatch({ type: SET_AUTHENTICATED, payload: true });
              }
            })
            .catch((e) => {
              dispatch({ type: SET_ERROR, error: "Ошибка выполнения запроса" });
            });
        }
      });

    const cookie = getCookie("accessToken");
    if (cookie) {
      dispatch({ type: SET_COOKIE, payload: cookie });
    }
  });

  useEffect(() => {
    dispatch(fetchIngredientsReducer());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      window.confirm("error");
      dispatch({ type: RESET_ORDER });
    }
  }, [error, dispatch]);

  return (
    <main className={styles.app}>
      <NavigationPanel />
      <Switch>
        <Route exact path="/">
          <ConstructorPage />
        </Route>

        <Route exact path="/login">
          <LoginPage />
        </Route>

        <Route exact path="/register">
          <RegistrationPage />
        </Route>

        <Route exact path="/forgot-password">
          <ForgotPasswordPage />
        </Route>

        <Route exact path="/reset-password">
          <ResetPasswordPage />
        </Route>

        <ProtectedRoute exact path="/profile">
          <ProfilePage />
        </ProtectedRoute>

        <Route exact path="/ingredient/:id">
          <IngredientInfoPage />
        </Route>

        <ErrorPage />
      </Switch>

      <div id="modal" />
    </main>
  );
}

export default App;
