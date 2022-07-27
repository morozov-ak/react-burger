 import React, { useEffect, useMemo } from "react";
import styles from "./orderDetailsPage.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TStore } from "../../services/reducers";
import { IngredientsIcon } from "../../components/ingredientIcon/ingredientIcon";
import { formatDate } from "../../utils/formatDate";
import { WS_START_WITH_CUSTOM_URL } from "../../services/actions/ws";
import { useDispatch } from "react-redux";
import { WS_URL } from "../../constants/constants";
import { getCookie } from "../../utils/getCookie";

const OrderDetailsPage = () => {
  
  const ordersById = useSelector((state:TStore) => state.wsOrders.ordersById);
  const ingredientsById = useSelector((state:TStore) => state.ingredients.ingredientsById);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!Object.keys(ordersById).length) {
      dispatch({
        type: WS_START_WITH_CUSTOM_URL,
        payload: `${WS_URL}?token=${getCookie("accessToken")}`,
      });
    }
  }, [ordersById,dispatch]);
  
  const order = ordersById[id]

  const orderStatus = useMemo(() => {
    switch (order?.status){
      case 'done':
        return 'Готов'
      case 'pending':
        return 'Готовится'
      default:
        return order?.status
    }
  },[order?.status]) 

  if (!order) {
    return null;
  }

  let totalPrice = 0

  const countedIngredients = order?.ingredients.reduce((res,ingredient) => {
      totalPrice += ingredientsById[ingredient].price
      return res[ingredient] ? {...res, [ingredient]:res[ingredient] + 1} : {...res, [ingredient]:1} 
    }
    ,{} as {[key: string]: number})


  if (!order) {
    return null;
  }


  return (
    <div  className={styles.root}>
      <p
        className="text text_type_digits-default mb-10"
        style={{ textAlign: "center" }}
      >
        #{order.number}
      </p>
      <h1 className="text text_type_main-medium mb-3">
        {order.name}
      </h1>
      <p className="text text_type_main-default mb-15">
        {orderStatus}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={"custom-scroll mb-10"}>
        
        {order.ingredients.slice(0,-1).map((ingredient, i) => 
          {const ingredientObject = ingredientsById[ingredient]
          return <li key={ingredientObject._id} className={styles.ingredient}>
            <div className={styles.leftSide}>
              <IngredientsIcon
                ingredient={ingredientObject._id}
              />
              <p className="text text_type_main-default ml-4">
                {ingredientObject.name}
              </p>
            </div>
            
            <p className={styles.priceContainer}>
              <span className="text text_type_main-default mr-2">
                {countedIngredients[ingredient]} x {ingredientObject.price}
              </span>{" "}
              <CurrencyIcon type="primary" />
            </p>
          </li>}
        )}

      </ul>
      <div className={styles.info}>
        <time className="text text_type_main-default text_color_inactive">
          {formatDate(order.createdAt)}
        </time>
        <div style={{ marginLeft: "auto" }} className={styles.priceContainer}>
          <span className="text text_type_main-default mr-2">
            {totalPrice}
          </span>{" "}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
