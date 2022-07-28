import styles from "./burgerIngredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { memo, useMemo } from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../types/types";
import { TStore } from "../../services/reducers";
import { useSelector } from "../../services/hooks";

type TBurgerIngredient={
  ingredient: TIngredient
}

const BurgerIngredient = memo(({ ingredient }:TBurgerIngredient) => {
  const { fillingIds, bunId } = useSelector((state) => {
    return {
      showedIngredientId: state.ingredientDetails.showedIngredientId,
      fillingIds: state.burgerConstructor.fillingIds,
      bunId: state.burgerConstructor.bunId,
    };
  });

  const [, dragRef, dragPreviewRef] = useDrag({
    type: ingredient.type,
    item: ingredient,
  });

  const count = useMemo(() => {
    return ingredient.type === "bun"
      ? bunId.filter((item:string) => item === ingredient._id).length
      : fillingIds.filter((item:string) => item === ingredient._id).length;
  }, [bunId, fillingIds, ingredient]);

  let location = useLocation();

  return (
    <Link
      ref={dragRef}
      className={`mb-4 ${styles.ingredient}`}
      key={ingredient._id}
      to={{
        pathname: `/ingredient/${ingredient._id}`,
        state: { background: location },
      }}
    >
      {Boolean(count) && <Counter count={count} size="default" />}
      <img ref={dragPreviewRef} src={ingredient.image} alt={ingredient.name} />
      <p
        className={`text text_type_digits-medium mb-1 mt-1 ${styles.ingredient_name}`}
      >
        {ingredient.price} <CurrencyIcon type='primary' />
      </p>
      <p className={`text text_type_main-default ${styles.ingredient_name}`}>
        {ingredient.name}
      </p>
    </Link>
  );
});

BurgerIngredient.displayName = "BurgerIngredient";

export default BurgerIngredient;
