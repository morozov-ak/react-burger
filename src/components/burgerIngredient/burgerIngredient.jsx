import styles from "./burgerIngredient.module.css";
import { ingredient } from "../../types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { memo, useCallback, useMemo } from "react";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredientDetails/ingredientDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_NUTRITIONS_MODAL,
  OPEN_NUTRITIONS_MODAL,
} from "../../services/actions/bun";
import { useDrag } from "react-dnd";

const BurgerIngredient = memo(({ ingredient }) => {
  const { showedIngredientId, fillingIds, bunId } = useSelector((state) => {
    return {
      showedIngredientId: state.order.showedIngredientId,
      fillingIds: state.burgerConstructor.fillingIds,
      bunId: state.burgerConstructor.bunId,
    };
  });

  const dispatch = useDispatch();

  const handleOpenModal = useCallback(() => {
    dispatch({
      type: OPEN_NUTRITIONS_MODAL,
      showedIngredientId: ingredient._id,
    });
  }, [dispatch, ingredient]);

  const handleCloseModal = useCallback(() => {
    dispatch({ type: CLOSE_NUTRITIONS_MODAL, showedIngredientId: "" });
  }, [dispatch]);

  const [, dragRef, dragPreviewRef] = useDrag({
    type: ingredient.type,
    item: ingredient,
  });

  const count = useMemo(() => {
    return ingredient.type === "bun"
      ? bunId.filter((item) => item === ingredient._id).length
      : fillingIds.filter((item) => item === ingredient._id).length;
  }, [bunId, fillingIds, ingredient]);

  return (
    <button
      ref={dragRef}
      className={`mb-4 ${styles.ingredient}`}
      onClick={handleOpenModal}
    >
      {Boolean(count) && <Counter count={count} size="default" />}
      <img ref={dragPreviewRef} src={ingredient.image} alt={ingredient.name} />
      <p
        className={`text text_type_digits-medium mb-1 mt-1 ${styles.ingredient_name}`}
      >
        {ingredient.price} <CurrencyIcon />
      </p>
      <p className={`text text_type_main-default ${styles.ingredient_name}`}>
        {ingredient.name}
      </p>

      {showedIngredientId === ingredient._id && (
        <Modal onClose={handleCloseModal} headerText="Детали ингредиента">
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </button>
  );
});

BurgerIngredient.propTypes = {
  ingredient: ingredient,
};

BurgerIngredient.displayName = "BurgerIngredient";

export default BurgerIngredient;
