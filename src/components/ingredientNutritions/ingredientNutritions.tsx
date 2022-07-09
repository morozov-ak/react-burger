import React, { memo } from "react";
import styles from "./ingredientNutritions.module.css";

export type TIngredientNutritions = {
  title: string,
  value: number,
}

export const IngredientNutritions = memo(({ title, value }:TIngredientNutritions) => {
  return (
    <div className={`${styles.nutritions_item}`}>
      <p className="text text_type_main-default">{title}</p>
      <p className="text text_type_digits-default">{value}</p>
    </div>
  );
});

