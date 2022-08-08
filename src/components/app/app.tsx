import React, { useEffect } from "react";
import NavigationPanel from "../appHeader/appHeader";
import styles from "./app.module.css";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import {
  fetchIngredientsReducer,
  RESET_ORDER,
} from "../../services/actions/bun";
import { ConstructorPage } from "../../pages/constructorPage/constructorPage";
import { ErrorPage } from "../../pages/errorPage/errorPage";
import { LoginPage } from "../../pages/loginPage/loginPage";
import { RegistrationPage } from "../../pages/registrationPage/registrationPage";
import { ForgotPasswordPage } from "../../pages/forgotPasswordPage/forgotPasswordPage";
import { ResetPasswordPage } from "../../pages/resetPasswordPage/resetPasswordPage";
import { ProfilePage } from "../../pages/profilePage/profilePage";
import { IngredientInfoPage } from "../../pages/ingredientInfoPage/ingredientInfoPage";
import { ProtectedRoute } from "../protectedRoute/protectedRoute";
import {
  initialReducer,
} from "../../services/actions";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredientDetails/ingredientDetails";
import { LoginedRoute } from "../loginedRoute/loginedRoute";
import { OrdersPage } from "../../pages/ordersPage/ordersPage";
import OrderDetailsPage from "../../pages/orderDetailsPage/orderDetailsPage";
import OrdersFeed from "../../pages/orders-feed/ordersFeed";
import { useDispatch, useSelector } from "../../services/hooks";

function App() {
  const { error, isReseted } = useSelector((state) => {
    return {
      error: state.order.errorOrder,
      isReseted: state.resetPasswordForm.isReseted,
    };
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialReducer() as any)
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredientsReducer() as any);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      window.confirm("error");
      dispatch({ type: RESET_ORDER });
    }
  }, [error, dispatch]);

  let location:any = useLocation();
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

        <ProtectedRoute exact path="/profile/orders/:id">
          <OrderDetailsPage />
        </ProtectedRoute>

        <Route path="/feed" exact>
          <OrdersFeed />
        </Route>

        <Route exact path="/feed/:id">
          <OrderDetailsPage />
        </Route>


        <Route path="/ingredient/:id">
          <IngredientInfoPage />
        </Route>

        <ErrorPage />
      </Switch>
      {background && (
        <Route
          path="/ingredient/:id"
          children={
            <Modal headerText="Детали ингредиента">
              <IngredientDetails />
            </Modal>
          }
        />
      )}
      {background && (
        <Route
          path="/profile/orders/:id"
          children={
            <Modal>
              <OrderDetailsPage />
            </Modal>
          }
        />
      )}
      {background && (
        <Route
          path="/feed/:id"
          children={
            <Modal>
              <OrderDetailsPage />
            </Modal>
          }
        />
      )}
      <div id="modal" />
    </main>
  );
}

export default App;
