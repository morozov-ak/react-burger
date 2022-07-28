import React, {  FunctionComponent,  } from "react";
import { TOrder } from "../../../services/reducers/ws";
import { IngredientsIcon } from "../../ingredientIcon/ingredientIcon";
import styles from "./ingredientsSet.module.css";


type PropsType = {
  ingredients: Array<string>;
}

export const  IngredientsSet:FunctionComponent<PropsType> = ({ingredients}) => {
  return (
    <div className={styles.orderContainer}>
          {ingredients.reverse().map((ingredient,index) => (
           <IngredientsIcon key={`${ingredient}${index}`} ingredient={ingredient} />
          ))}  
    </div>
  );
}
