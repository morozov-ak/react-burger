import React, {  FunctionComponent,  } from "react";
import { useSelector } from "../../services/hooks";
import { TStore } from "../../services/reducers";
import styles from "./ingredientIcon.module.css";


type PropsType = {
  ingredient: string;
}

export const  IngredientsIcon:FunctionComponent<PropsType> = ({ingredient}) => {
  const ingredientsById = useSelector((state) => state.ingredients.ingredientsById);
  if(ingredientsById[ingredient]){
    return (
      <div key={ingredient} className={styles.itemBg}>
        <div className={styles.item}>
          <img className={styles.image} alt={ingredientsById[ingredient].name} src={ingredientsById[ingredient].image_mobile}/>
        </div>
      </div>
    );
  }
  return null
}
