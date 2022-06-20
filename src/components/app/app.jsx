import React, { useEffect } from "react";
import NavigationPanel from "../appHeader/appHeader";
import styles from "./app.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
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
  SET_AUTHENTICATED,
  SET_COOKIE,
  SET_ISLOADED,
} from "../../services/actions";
import { getUserInfo } from "../../api/getUserInfo";
import { refreshCookie } from "../../api/refreshCookie";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredientDetails/ingredientDetails";
import { deleteCookie } from "../../utils/deleteCookie";
import { LoginedRoute } from "../loginedRoute/loginedRoute";
import { OrdersPage } from "../ordersPage/ordersPage";

function App() {
  const error = useSelector((state) => state.order.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const cookie = getCookie("accessToken");
    if (cookie) {
      dispatch({ type: SET_COOKIE, payload: cookie });
    }
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
              deleteCookie("accessToken");
              localStorage.clear("refreshToken");
            });
        }
      })
      .finally(dispatch({ type: SET_ISLOADED }));
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
  console.log(background);

  return (
    <main className={styles.app}>
      <NavigationPanel />
      <Switch>
        <Route exact path="/">
          <ConstructorPage />
        </Route>

        <LoginedRoute exact path="/login">
          <LoginPage />
        </LoginedRoute>

        <LoginedRoute exact path="/register">
          <RegistrationPage />
        </LoginedRoute>

        <Route exact path="/forgot-password">
          <ForgotPasswordPage />
        </Route>

        <Route exact path="/reset-password">
          <ResetPasswordPage />
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
