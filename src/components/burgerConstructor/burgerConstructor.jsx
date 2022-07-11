import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../orderDetails/orderDetails";
import styles from "./burgerConstructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_INGREDIENT,
  CLOSE_ORDER_MODAL,
  makeOrder,
  OPEN_ORDER_MODAL,
} from "../../services/actions/bun";
import { useDrop } from "react-dnd";
import BurgerConstructorIngredient from "../burgerConstructorIngredient/burgerConstructorIngredient";
import { useHistory } from "react-router-dom";

const BurgerConstructor = memo(() => {
  const dispatch = useDispatch();
  const { bun = 0, filling } = useSelector(
    (state) => state.burgerConstructor.createdBun
  );
  const { fillingIds, bunId, orderId, isOpenedOrederModal, isAuthenticated } =
    useSelector((state) => {
      return {
        fillingIds: state.burgerConstructor.fillingIds,
        bunId: state.burgerConstructor.bunId,
        orderId: state.order.orderId,
        isOpenedOrederModal: state.order.isOpenedOrederModal,
        isAuthenticated: state.auth.isAuthenticated,
      };
    });

  const [totalPrice, settotalPrice] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const { price = 0 } = bun;
    settotalPrice(
      price * 2 + filling.reduce((acc, item) => (acc += item.price), 0)
    );
  }, [bun, filling, fillingIds.length]);

  const [, bunTopDropTarget] = useDrop({
    accept: ["bun"],
    drop(item) {
      const unique_ingredient = { ...item, uid: Date.now() };
      dispatch({ type: ADD_INGREDIENT, item: unique_ingredient });
    },
  });

  const [, bunBottomDropTarget] = useDrop({
    accept: ["bun"],
    drop(item) {
      const unique_ingredient = { ...item, uid: Date.now() };
      dispatch({ type: ADD_INGREDIENT, item: unique_ingredient });
    },
  });

  const [, fillingDropTarget] = useDrop({
    accept: ["main", "sauce"],
    drop(item) {
      const unique_ingredient = { ...item, uid: Date.now() };
      dispatch({ type: ADD_INGREDIENT, item: unique_ingredient });
    },
  });

  const handleOpenModal = useCallback(() => {
    if (isAuthenticated) {
      const orderIds = [bunId[0], ...fillingIds, bunId[1]];
      dispatch({ type: OPEN_ORDER_MODAL });
      dispatch(makeOrder(orderIds));
    } else {
      history.push("login");
    }
  }, [dispatch, fillingIds, bunId, history, isAuthenticated]);

  const handleCloseModal = useCallback(() => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  }, [dispatch]);

  return (
    <section className={`ml-10 ${styles.ingredients}`}>
      <div className={`${styles.wrapper}`}>
        <div className={`ml-8 ${styles.bun_top}`} ref={bunTopDropTarget}>
          {bun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <p className={`text_type_main-default ${styles.bun_placeholder}`}>
              Выберите булку
            </p>
          )}
        </div>

        <div className={` custom-scroll ${styles.scrollable_ingredients}`}>
          {filling.length ? (
            filling.map((ingredient) => (
              <BurgerConstructorIngredient
                key={ingredient.uid}
                ingredient={ingredient}
              />
            ))
          ) : (
            <div className={`ml-8 ${styles.filling}`} ref={fillingDropTarget}>
              <p className={`text_type_main-default ${styles.bun_placeholder}`}>
                Выберите начинку
              </p>
            </div>
          )}
        </div>

        <div className={`ml-8 ${styles.bun_bottom}`} ref={bunBottomDropTarget}>
          {bun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <p className={`text_type_main-default ${styles.bun_placeholder}`}>
              Выберите булку
            </p>
          )}
        </div>
      </div>

      <div className={`mt-10 ${styles.constructor_footer}`}>
        <div className={`mr-10 ${styles.currency}`}>
          <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
          <CurrencyIcon />
        </div>

        <Button type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>

      {isOpenedOrederModal && (
        <Modal onClose={handleCloseModal}>
          {orderId ? (
            <OrderDetails orderNumber={orderId} />
          ) : (
            <div className={styles.logo_container}>
              <div className={styles.logo_image}>
                <Logo />
              </div>
            </div>
          )}
        </Modal>
      )}
    </section>
  );
});

export default BurgerConstructor;
