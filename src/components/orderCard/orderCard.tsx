import React, {  FunctionComponent, useMemo, } from "react";
import styles from "./orderCard.module.css";
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import * as H from "history";

import { TOrder } from "../../services/reducers/ws";
import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { IngredientsSet } from "./ingredientsSet/ingredientsSet";
import { useSelector } from "react-redux";
import { TStore } from "../../services/reducers";

type PropsType = {
  order:TOrder
}

export const  OrderCard:FunctionComponent<PropsType> = ({order}) => {
  const ingredientsById = useSelector((state:TStore) => state.ingredients.ingredientsById);
  const location = useLocation();

  let totalCost = useMemo(() => 
    order.ingredients.reduce((total,ingredient) => total + ingredientsById[ingredient].price
    , 0)
  ,[order.ingredients, ingredientsById])


  const orderStatus = useMemo(() => {
    switch (order.status){
      case 'done':
        return 'Готов'
      case 'pending':
        return 'Готовится'
      default:
        return order.status
    }
  },[order.status]) 



  return (
    <div className={styles.orderContainer}>
      <Link
        className={styles.order}
        to={{
          pathname: `orders/${order._id}`,
          state: { background: location },
        }}
      >
        <p className={styles.header}>
          <span className="text text_type_digits-default">#{order.number}</span>
          <time className="text text_type_main-default text_color_inactive">
            {formatDate(order.createdAt)}
          </time>
        </p>
        <p className="text text_type_main-medium mb-2">{order.name}</p>
        <p className="text text_type_main-default mb-6">
          {orderStatus}
        </p>

        <div className={styles.ingredientsContainer}>
          <ul className={styles.ingredientsList}>
            <IngredientsSet ingredients={order.ingredients}/>
          </ul>
          <p className={styles.priceContainer}>
            <span className="text text_type_digits-default mr-2">
              {totalCost}
            </span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </Link>
    </div>
  );
}
