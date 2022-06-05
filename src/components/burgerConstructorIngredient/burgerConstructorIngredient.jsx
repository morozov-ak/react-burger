import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { memo } from 'react';
import styles from './burgerConstructorIngredient.module.css'
import PropTypes from 'prop-types';
import { ingredient } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_INGREDIENT, MOVE_INGREDIENT } from '../../services/actions/bun';
import { useDrag, useDrop } from "react-dnd";

const BurgerConstructorIngredient = memo(({ingredient}) => {
  const dispatch = useDispatch()
  console.log(ingredient)

  const [, DropTarget] = useDrop({
    accept: ['main','sauce'],
    drop(item) {
      if(item.uid){
        dispatch({type:MOVE_INGREDIENT, sourceItem: item, targetItem:ingredient})
      } else {
        const unique_ingredient = {...item, uid: Date.now() }
        dispatch({type:ADD_INGREDIENT, item: unique_ingredient})
      }
    },
  });

  const [, dragRef] = useDrag({
    type: ingredient.type,
    item: ingredient
});


    return (
      <div ref={dragRef}>
        <div key={ingredient.uid} ref={DropTarget} className={`${styles.burger_element}`}>
          <div className={`pl-1 pr-1 ${styles.burger_element}`}>
              <DragIcon/>
          </div>
          <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
          />
        </div>
      </div>
    );
  })

  BurgerConstructorIngredient.propTypes = {
    ingredients: ingredient
  }
  

export default BurgerConstructorIngredient;
