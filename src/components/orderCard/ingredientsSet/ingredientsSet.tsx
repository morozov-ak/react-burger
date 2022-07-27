import React, {  FunctionComponent,  } from "react";
import { TOrder } from "../../../services/reducers/ws";
import { IngredientsIcon } from "../../ingredientIcon/ingredientIcon";
import styles from "./ingredientsSet.module.css";


type PropsType = {
  order: TOrder;
}

export const  IngredientsSet:FunctionComponent<PropsType> = ({order}) => {
  return (
    <div className={styles.orderContainer}>
          {order.ingredients.slice(0,-1).reverse().map((ingredient,index) => (
           <IngredientsIcon key={`${ingredient}${order._id}${index}`} ingredient={ingredient} />
          ))}  
    </div>
  );
}
