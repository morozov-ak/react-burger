import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burgerIngredients/burgerIngredients";
import BurgerConstructor from "../../components/burgerConstructor/burgerConstructor";

import styles from "./constructorPage.module.css";

export function ConstructorPage() {
  return (
    <section className={styles.content}>
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <div className={styles.constructor_wrapper}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </section>
  );
}
