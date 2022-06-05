import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { memo, useCallback } from 'react';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../orderDetails/orderDetails';
import styles from './burgerConstructor.module.css'
import PropTypes from 'prop-types';
import { ingredient } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_ORDER_MODAL, OPEN_ORDER_MODAL } from '../../services/actions/bun';

const BurgerConstructor = memo(({ingredients}) => {

  const dispatch = useDispatch()

    const isOpenedOrederModal = useSelector(state => state.bun.isOpenedOrederModal);

    const handleOpenModal = useCallback(()=>{
      dispatch({type: OPEN_ORDER_MODAL})
    },[dispatch])

    const handleCloseModal = useCallback(()=>{
      dispatch({type: CLOSE_ORDER_MODAL})
    },[dispatch])

    return (
        <section className={`ml-10 ${styles.ingredients}`}>
          <div className={`${styles.wrapper}`}>
              <div className="ml-8">
                  <ConstructorElement
                  type="top"
                  isLocked={true}
                  text="Краторная булка N-200i (верх)"
                  price={200}
                  thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                  />
              </div>
  
              <div className={` custom-scroll ${styles.scrollable_ingredients}`}>
                  {ingredients.map((ingredient)=>{
                    return (
                    <div key={ingredient._id} className={`${styles.burger_element}`}>
                        <div className={`pl-1 pr-1 ${styles.burger_element}`}>
                            <DragIcon/>
                        </div>
                        <ConstructorElement
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                        />
                    </div>)
                  })}
                  
              </div>
              
              <div className="ml-8">
                  <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text="Краторная булка N-200i (верх)"
                  price={200}
                  thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                  />
              </div>
          </div>
          
          <div className={`mt-10 ${styles.constructor_footer}`}>
              
              <div className={`mr-10 ${styles.currency}`}>
                  <p className="text text_type_digits-medium mr-2">0</p>
                  <CurrencyIcon/>
              </div>
              
              <Button type="primary" size="large" onClick={handleOpenModal}>
                  Оформить заказ
              </Button>
          </div>

          {isOpenedOrederModal && 
                <Modal  onClose={handleCloseModal}>
                  <OrderDetails orderNumber={3434}/>
                </Modal>
          }
          
      </section>
    );
  })

  BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredient)
  }
  

export default BurgerConstructor;
