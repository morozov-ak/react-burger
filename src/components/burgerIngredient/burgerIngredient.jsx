import styles from './burgerIngredient.module.css'
import { ingredient } from '../../types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types'
import { memo, useCallback } from 'react';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredientDetails/ingredientDetails';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_NUTRITIONS_MODAL, OPEN_NUTRITIONS_MODAL } from '../../services/actions/bun';

const BurgerIngredient = memo(({ingredient,count}) => {
    const showedIngredientId = useSelector(state => state.bun.showedIngredientId);
    const dispatch = useDispatch()
    const handleOpenModal = useCallback(()=>{
      dispatch({type: OPEN_NUTRITIONS_MODAL, showedIngredientId: ingredient._id})
    },[dispatch,ingredient])

    const handleCloseModal = useCallback(()=>{
      dispatch({type: CLOSE_NUTRITIONS_MODAL, showedIngredientId: ''})
    },[dispatch])

  return (
      <button className={`mb-4 ${styles.ingredient}`} onClick={handleOpenModal}>
            {Boolean(count) && <Counter count={count} size='default'/>}
            <img src={ingredient.image} alt={ingredient.name}/>
            <p className={`text text_type_digits-medium mb-1 mt-1 ${styles.ingredient_name}`}>{ingredient.price} <CurrencyIcon/></p>
            <p className={`text text_type_main-default ${styles.ingredient_name}`}>{ingredient.name}</p>
            
            {showedIngredientId === ingredient._id && 
                <Modal  onClose={handleCloseModal} headerText='Детали ингредиента'>
                  <IngredientDetails ingredient={ingredient}/>
                </Modal>
            }
      </button>
  );
})

BurgerIngredient.propTypes = {
  ingredient: ingredient,
  count: PropTypes.number,
}

BurgerIngredient.displayName='BurgerIngredient'

export default BurgerIngredient;
