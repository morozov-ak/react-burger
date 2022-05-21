import React, { memo } from 'react';
import styles from './ingredientDetails.module.css';
import { ingredient } from '../../types';

export const IngredientDetails = memo(({ingredient}) => {

    const {image_large,name,calories,fat,proteins,carbohydrates} = ingredient;

    return (
        <section className={`pb-15 ${styles.card}`} >
            <img src={image_large} alt={name}/>
            <p className="mt-4 text text_type_main-medium">{name}</p>
            <div className={`mt-8 ${styles.nutritions_wrapper}`}>
                <div className={`${styles.nutritions_item}`}>
                    <p className="text text_type_main-default">Калории,ккал</p>
                    <p className="text text_type_digits-default">{calories}</p>
                </div>
                <div className={`${styles.nutritions_item}`}>
                    <p className="text text_type_main-default">Белки, г</p>
                    <p className="text text_type_digits-default">{proteins}</p>
                </div>
                <div className={`${styles.nutritions_item}`}>
                    <p className="text text_type_main-default">Жиры, г</p>
                    <p className="text text_type_digits-default">{fat}</p>
                </div>
                <div className={`${styles.nutritions_item}`}>
                    <p className="text text_type_main-default">Углеводы, г</p>
                    <p className="text text_type_digits-default">{carbohydrates}</p>
                </div>
            </div>
        </section>
    );
}) 

IngredientDetails.propTypes = {
  ingredient:ingredient,
}