import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { memo, useCallback } from "react";
import styles from "./burgerConstructorIngredient.module.css";
import { ingredient } from "../../types";
import { useDispatch } from "react-redux";
import {
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  REMOVE_INGREDIENT,
} from "../../services/actions/bun";
import { useDrag, useDrop } from "react-dnd";

const BurgerConstructorIngredient = memo(({ ingredient }) => {
  const dispatch = useDispatch();

  const [, DropTarget] = useDrop({
    accept: ["main", "sauce"],
    drop(item) {
      if (item.uid) {
        dispatch({
          type: MOVE_INGREDIENT,
          sourceItem: item,
          targetItem: ingredient,
        });
      } else {
        const unique_ingredient = { ...item, uid: Date.now() };
        dispatch({ type: ADD_INGREDIENT, item: unique_ingredient });
      }
    },
  });

  const [, dragRef] = useDrag({
    type: ingredient.type,
    item: ingredient,
  });

  const handleRemove = useCallback(() => {
    dispatch({ type: REMOVE_INGREDIENT, payload: ingredient });
  }, [dispatch, ingredient]);

  return (
    <div ref={dragRef}>
      <div ref={DropTarget} className={`${styles.burger_element}`}>
        <div className={`pl-1 pr-1 ${styles.burger_element}`}>
          <DragIcon />
        </div>
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={handleRemove}
        />
      </div>
    </div>
  );
});

BurgerConstructorIngredient.propTypes = {
  ingredients: ingredient,
};

export default BurgerConstructorIngredient;
