import React, { memo } from "react";
import styles from "./ingredientDetails.module.css";
import { IngredientNutritions } from "../ingredientNutritions/ingredientNutritions";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TStore } from "../../services/reducers";

export const IngredientDetails = memo(() => {
  let { id }:{id:string} = useParams();
  
  const ingredients = useSelector((state:TStore) => state.ingredients.ingredients);

if(ingredients.length){
    const { image_large, name, calories, fat, proteins, carbohydrates } =
    ingredients?.filter((ingredient) => id === ingredient._id)[0];

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
  );}
  return null
});
