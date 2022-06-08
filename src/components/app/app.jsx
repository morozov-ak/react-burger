import React, { useEffect } from "react";
import NavigationPanel from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import styles from "./app.module.css";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchIngredientsReducer,
  RESET_ORDER,
} from "../../services/actions/bun";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const error = useSelector((state) => state.order.error);
  const dispatch = useDispatch();

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
      <section className={styles.content}>
        <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
        <div className={styles.constructor_wrapper}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
      </section>
      <div id="modal" />
    </main>
  );
}

export default App;
