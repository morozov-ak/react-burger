import React, {  FunctionComponent,  } from "react";
import { useSelector } from "react-redux";
import { TStore } from "../../services/reducers";
import styles from "./ingredientIcon.module.css";


type PropsType = {
  ingredient: string;
}

export const  IngredientsIcon:FunctionComponent<PropsType> = ({ingredient}) => {
  const ingredientsById = useSelector((state:TStore) => state.ingredients.ingredientsById);

  return (
            
            <div key={ingredient} className={styles.itemBg}>
              <div className={styles.item}>
                <img className={styles.image} src={ingredientsById[ingredient].image_mobile}/>
              </div>
            </div>
          
  );
}
