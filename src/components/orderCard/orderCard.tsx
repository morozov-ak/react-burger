import React, {  FunctionComponent, useMemo, } from "react";
import styles from "./orderCard.module.css";
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrder } from "../../services/reducers/ws";
import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { IngredientsSet } from "./ingredientsSet/ingredientsSet";
import { useSelector } from "react-redux";
import { TStore } from "../../services/reducers";

type PropsType = {
  order:TOrder
  type?: 'feed' | 'orders'
}

export const  OrderCard:FunctionComponent<PropsType> = ({order,type='orders'}) => {
  const ingredientsById = useSelector((state:TStore) => state.ingredients.ingredientsById);
  const location = useLocation();

  let totalCost = useMemo(() => 
    order.ingredients.reduce((total,ingredient) => ingredientsById[ingredient] ? total + ingredientsById[ingredient].price : total
    , 0)
  ,[order.ingredients, ingredientsById])


  const orderStatus = useMemo(() => {
    switch (order.status){
      case 'done':
        return 'Готов'
      case 'pending':
        return 'Готовится'
      case 'created':
        return 'Создан'
      default:
        return order.status
    }
  },[order.status]) 

  let uniqueIngredients = order.ingredients.reduce((acc, ing) => {
    if(acc.includes(ing)){
      return acc
    }if(ing=== null){
      return acc
    }

    return [...acc,ing]
  }, [] as Array<string>)



  return (
    <div className={styles.orderContainer}>
      <Link
        className={styles.order}
        to={{
          pathname: `${type}/${order._id}`,
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
            <IngredientsSet ingredients={uniqueIngredients}/>
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
