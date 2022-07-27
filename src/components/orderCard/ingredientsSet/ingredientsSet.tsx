import React, {  FunctionComponent,  } from "react";
import { useSelector } from "react-redux";
import { TStore } from "../../../services/reducers";
import { IngredientsIcon } from "../../ingredientIcon/ingredientIcon";
import styles from "./ingredientsSet.module.css";


type PropsType = {
  ingredients: string[];
}

export const  IngredientsSet:FunctionComponent<PropsType> = ({ingredients}) => {

  return (
    <div className={styles.orderContainer}>
          {ingredients.slice(0,-1).reverse().map(ingredient => (
           <IngredientsIcon key={ingredient} ingredient={ingredient} />
          
          ))}  
    </div>
  );
}
