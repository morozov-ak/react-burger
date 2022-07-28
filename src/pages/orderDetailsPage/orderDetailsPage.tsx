 import React, { useEffect, useMemo } from "react";
import styles from "./orderDetailsPage.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import { IngredientsIcon } from "../../components/ingredientIcon/ingredientIcon";
import { formatDate } from "../../utils/formatDate";
import { wsActions, WS_START_WITH_CUSTOM_URL } from "../../services/actions/ws";
import { WS_URL } from "../../constants/constants";
import { getCookie } from "../../utils/getCookie";
import { useDispatch, useSelector } from "../../services/hooks";

const OrderDetailsPage = () => {
    const { ordersById, ingredientsById } = useSelector((state) => {
    return {
      ordersById: state.wsOrders.ordersById,
      ingredientsById: state.ingredients.ingredientsById,
    };
  });

  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch()
  const location:any = useLocation()
  const isOrders = useRouteMatch("/profile/orders")
  const isFeed = useRouteMatch("/feed")

  useEffect(() => {
    if (!location?.state?.background) {
      if(isOrders){
        dispatch({
          type: WS_START_WITH_CUSTOM_URL,
          payload: `${WS_URL}?token=${getCookie("accessToken")}`,
        });
        return () => {
          dispatch({ type: wsActions.wsClose });
        };
      }

      if(isFeed){
        dispatch({
          type: wsActions.wsInit
        });
        return () => {
          dispatch({ type: wsActions.wsClose });
        };
      }

    }

  }, []);
  
  const order = ordersById[id]

  const orderStatus = useMemo(() => {
    switch (order?.status){
      case 'done':
        return 'Готов'
      case 'pending':
        return 'Готовится'
      case 'created':
        return 'Создан'
      default:
        return order?.status
    }
  },[order?.status]) 

  if (!order) {
    return null;
  }

  let totalPrice = 0
  let countedIngredients:{[key: string]: number}

  let uniqueIngredients = order.ingredients.reduce((acc, ing) => {
    if(acc.includes(ing)){
      return acc
    }if(ing=== null){
      return acc
    }

    return [...acc,ing]
  }, [] as Array<string>)

  if(Object.keys(ingredientsById)){
    countedIngredients = order?.ingredients.reduce((res,ingredient) => {
      totalPrice += ingredientsById[ingredient] ? ingredientsById[ingredient].price : 0
      return res[ingredient] ? {...res, [ingredient]:res[ingredient] + 1} : {...res, [ingredient]:1} 
    }
    ,{} as {[key: string]: number})
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
        
        {uniqueIngredients.map((ingredient, index) => 
          {const ingredientObject = ingredientsById[ingredient]
          if(ingredientObject){
            return <li key={`${ingredientObject._id}${index}`} className={styles.ingredient}>
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
          }
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
