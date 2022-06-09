import React, { memo } from "react";
import styles from "./ingredientDetails.module.css";
import { ingredient } from "../../types";
import { IngredientNutritions } from "../ingredientNutritions/ingredientNutritions";

export const IngredientDetails = memo(({ ingredient }) => {
  const { image_large, name, calories, fat, proteins, carbohydrates } =
    ingredient;

  return (
    <section className={`pb-15 ${styles.card}`}>
      <img src={image_large} alt={name} />
      <p className="mt-4 text text_type_main-medium">{name}</p>
      <div className={`mt-8 ${styles.nutritions_wrapper}`}>
        <IngredientNutritions title="Калории,ккал" value={calories} />
        <IngredientNutritions title="Белки, г" value={proteins} />
        <IngredientNutritions title="Жиры, г" value={fat} />
        <IngredientNutritions title="Углеводы, г" value={carbohydrates} />
      </div>
    </section>
  );
});

IngredientDetails.propTypes = {
  ingredient: ingredient,
};
