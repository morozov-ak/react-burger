import { Logo, Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo, useState } from "react";
import styles from "./burgerIngredients.module.css";
import BurgerIngredient from "../burgerIngredient/burgerIngredient";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { TStore } from "../../services/reducers";
import { TIngredient } from "../../types/types";

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

export type TSortIngredients = {
  [key:string]: Array<TIngredient>,
}

function BurgerIngredients() {
  const [current, setCurrent] = useState("bun");
  const ingredients = useSelector((state:TStore) => state.ingredients.ingredients);

  const [bunRef] = useInView({
    threshold: 1,
    onChange: (inview) => {
      if (inview) {
        setCurrent("bun");
      }
    },
  });
  const [sauceRef] = useInView({
    threshold: 1,
    onChange: (inview) => {
      if (inview) {
        setCurrent("sauce");
      }
    },
  });

  const [mainRef] = useInView({
    threshold: 0.3,
    onChange: (inview) => {
      if (inview) {
        setCurrent("main");
      }
    },
  });

  const handleChangeTab = (e:string) => {
    const scrolledElement:HTMLElement|null = document.getElementById(e);
    setCurrent(e);
    scrolledElement?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const ingredientsByCategories = useMemo(() => {
    return ingredients.reduce(
      (acc:TSortIngredients, ingredient) => {
        return {
          ...acc,
          [ingredient.type]: [...acc[ingredient.type], ingredient],
        };
      },
      { bun: [], main: [], sauce: [] } as TSortIngredients
    );
  }, [ingredients]);

  return (
    <section className={`${styles.ingredients}`}>
      <nav className={styles.ingredient_tabs}>
        <Tab value="bun" active={current === "bun"} onClick={handleChangeTab}>Булки</Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={handleChangeTab}
        >
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={handleChangeTab}>
          Начинки
        </Tab>
      </nav>
      {ingredients.length === 0 ? (
        <div className={`${styles.loader}`}>
          <Logo />
        </div>
      ) : (
        <main className={`custom-scroll ${styles.scroll}`}>
          <p id="bun" className="text text_type_main-medium mt-10 mb-6">
            Булки
          </p>
          <div className={`pl-4 ${styles.ingredients_wrapper}`} ref={bunRef}>
            {ingredientsByCategories.bun.map((ingredient:TIngredient) => (
              <BurgerIngredient key={ingredient._id} ingredient={ingredient} />
            ))}
          </div>
          <p id="sauce" className="text text_type_main-medium mt-10 mb-6">
            Соусы
          </p>
          <div className={`pl-4 ${styles.ingredients_wrapper}`} ref={sauceRef}>
            {ingredientsByCategories.sauce.map((ingredient:TIngredient) => (
              <BurgerIngredient key={ingredient._id} ingredient={ingredient} />
            ))}
          </div>
          <p id="main" className="text text_type_main-medium mt-10 mb-6">
            Начинки
          </p>
          <div className={`pl-4 ${styles.ingredients_wrapper}`} ref={mainRef}>
            {ingredientsByCategories.main.map((ingredient:TIngredient) => (
              <BurgerIngredient key={ingredient._id} ingredient={ingredient} />
            ))}
          </div>
        </main>
      )}
    </section>
  );
}

export default BurgerIngredients;
