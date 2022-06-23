import React, { useEffect } from "react";
import NavigationPanel from "../appHeader/appHeader";
import styles from "./app.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import {
  fetchIngredientsReducer,
  RESET_ORDER,
} from "../../services/actions/bun";
import { ConstructorPage } from "../pages/constructorPage/constructorPage";
import { ErrorPage } from "../pages/errorPage/errorPage";
import { LoginPage } from "../pages/loginPage/loginPage";
import { RegistrationPage } from "../pages/registrationPage/registrationPage";
import { ForgotPasswordPage } from "../pages/forgotPasswordPage/forgotPasswordPage";
import { ResetPasswordPage } from "../pages/resetPasswordPage/resetPasswordPage";
import { ProfilePage } from "../pages/profilePage/profilePage";
import { IngredientInfoPage } from "../pages/ingredientInfoPage/ingredientInfoPage";
import { ProtectedRoute } from "../protectedRoute/protectedRoute";
import { getCookie } from "../../utils/getCookie";
import {
  SET_AUTHENTICATED,
  SET_COOKIE,
  SET_ISLOADED,
  SET_ERROR,
} from "../../services/actions";
import { getUserInfo } from "../../api/getUserInfo";
import { refreshCookie } from "../../api/refreshCookie";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredientDetails/ingredientDetails";
import { deleteCookie } from "../../utils/deleteCookie";
import { LoginedRoute } from "../loginedRoute/loginedRoute";
import { OrdersPage } from "../pages/ordersPage/ordersPage";
import { setCookie } from "../../utils/setCookie";

function App() {
  const { error, isReseted, isLoaded } = useSelector((state) => {
    return {
      error: state.order.error,
      isReseted: state.resetPasswordForm.isReseted,
      isLoaded: state.auth.isLoaded,
    };
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("refreshToken");
    if (token) {
      getUserInfo()
        .then((res) => {
          if (res.success) {
            dispatch({ type: SET_AUTHENTICATED, payload: true });
            dispatch({ type: SET_ISLOADED });
          }
        })
        .catch((e) => {
          if (!e.success) {
            refreshCookie()
              .then((res) => {
                if (res.success) {
                  const cookie = res.accessToken.split("Bearer ")[1];
                  setCookie("accessToken", cookie);
                  localStorage.setItem("refreshToken", res.refreshToken);
                  dispatch({ type: SET_COOKIE, payload: cookie });
                  dispatch({ type: SET_AUTHENTICATED, payload: true });
                  dispatch({ type: SET_ISLOADED });
                } else {
                  dispatch({
                    type: SET_ERROR,
                    error: "Ошибка выполнения запроса",
                  });
                  dispatch({ type: SET_ISLOADED });
                }
              })
              .catch((e) => {
                deleteCookie("accessToken");
                localStorage.clear("refreshToken");
                dispatch({ type: SET_ISLOADED });
              });
          }
        });
    } else {
      dispatch({ type: SET_ISLOADED });
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredientsReducer());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      window.confirm("error");
      dispatch({ type: RESET_ORDER });
    }
  }, [error, dispatch]);

  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <main className={styles.app}>
      <NavigationPanel />
      <Switch location={background || location}>
        <Route exact path="/">
          <ConstructorPage />
        </Route>

        <Route exact path="/login">
          <LoginPage />
        </Route>

        <LoginedRoute exact path="/register">
          <RegistrationPage />
        </LoginedRoute>

        <LoginedRoute exact path="/forgot-password">
          <ForgotPasswordPage />
        </LoginedRoute>

        <Route exact path="/reset-password">
          {isReseted ? <ResetPasswordPage /> : <Redirect to="/login" />}
        </Route>

        <ProtectedRoute exact path="/profile">
          <ProfilePage />
        </ProtectedRoute>

        <ProtectedRoute exact path="/profile/orders">
          <OrdersPage />
        </ProtectedRoute>

        <Route path="/ingredient/:id">
          <IngredientInfoPage />
        </Route>

        <ErrorPage />
      </Switch>
      {background && (
        <Route
          path="/ingredient/:id"
          children={
            <Modal>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
      <div id="modal" />
    </main>
  );
}

export default App;
