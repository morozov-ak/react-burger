import styles from './burgerIngredient.module.css'
import { ingredient } from '../../types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types'
import { memo, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modalOverlay/modalOverlay';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredientDetails/ingredientDetails';

const BurgerIngredient = memo(({ingredient,count}) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = useCallback(()=>{
    setIsOpenModal(true)
  },[setIsOpenModal])

  const handleCloseModal = useCallback(()=>{
    console.log('resieved')
    setIsOpenModal(false)
  },[])



  return (
      <button className={`mb-4 ${styles.ingredient}`} onClick={handleOpenModal}>
            {Boolean(count) && <Counter count={count} size='default'/>}
            <img src={ingredient.image} alt={ingredient.name}/>
            <p className={`text text_type_digits-medium mb-1 mt-1 ${styles.ingredient_name}`}>{ingredient.price} <CurrencyIcon/></p>
            <p className={`text text_type_main-default ${styles.ingredient_name}`}>{ingredient.name}</p>
            
            {isOpenModal && createPortal(
              <ModalOverlay onClose={handleCloseModal} >
                <Modal  onClose={setIsOpenModal} headerText='Детали ингредиента'>
                  <IngredientDetails ingredient={ingredient}/>
                </Modal>
              </ModalOverlay>
              , document.getElementById('modal')
        )}
      </button>
  );
})

BurgerIngredient.propTypes = {
  ingredient: ingredient,
  count: PropTypes.number,
}

BurgerIngredient.displayName='BurgerIngredient'

export default BurgerIngredient;
