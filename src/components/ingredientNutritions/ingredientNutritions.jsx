import React, { memo } from 'react';
import styles from './ingredientNutritions.module.css';
import PropTypes from 'prop-types'

export const IngredientNutritions = memo(({title, value}) => {


    return (
        <div className={`${styles.nutritions_item}`}>
            <p className="text text_type_main-default">{title}</p>
            <p className="text text_type_digits-default">{value}</p>
        </div>
    );
}) 

IngredientNutritions.propTypes = {
    title: PropTypes.string,
    value: PropTypes.number,
}