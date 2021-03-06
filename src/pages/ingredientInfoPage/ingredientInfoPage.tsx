import React from "react";
import styles from "./ingredientInfoPage.module.css";


import { useParams } from "react-router-dom";
import { IngredientDetails } from "../../components/ingredientDetails/ingredientDetails";
import { TStore } from "../../services/reducers";
import { useSelector } from "../../services/hooks";

export function IngredientInfoPage() {
  let { id }:{id:string} = useParams();

  const { ingredients } = useSelector((state: TStore) => {
    return {
      ingredients: state.ingredients.ingredients,
    };
  });

  const ingredient = ingredients.filter(
    (ingredient) => ingredient._id === id
  )[0];

  return (
    <section className={styles.content}>
      {ingredient && <IngredientDetails  />}
    </section>
  );
}
