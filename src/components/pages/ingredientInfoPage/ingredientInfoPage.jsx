import React from "react";
import styles from "./ingredientInfoPage.module.css";

import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { IngredientDetails } from "../../ingredientDetails/ingredientDetails";

export function IngredientInfoPage() {
  let { id } = useParams();

  const { ingredients } = useSelector((state) => {
    return {
      ingredients: state.ingredients.ingredients,
    };
  });

  const ingredient = ingredients.filter(
    (ingredient) => ingredient._id === id
  )[0];

  return (
    <section className={styles.content}>
      {ingredient && <IngredientDetails ingredient={ingredient} />}
    </section>
  );
}
