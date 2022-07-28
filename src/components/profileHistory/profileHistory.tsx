import React, {  useEffect } from "react";
import styles from "./profileHistory.module.css";


import { TStore } from "../../services/reducers";
import { wsActions, WS_CONNECTION_CLOSE, WS_START_WITH_CUSTOM_URL } from "../../services/actions/ws";
import { getCookie } from "../../utils/getCookie";
import { WS_URL } from "../../constants/constants";
import { OrderCard } from "../orderCard/orderCard";
import { useDispatch, useSelector } from "../../services/hooks";

export function ProfileHistory() {

  const { orders } = useSelector(
    (state) => {
      return {
        orders: state.wsOrders.orders,
      };
    }
  );

  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch({
        type: WS_START_WITH_CUSTOM_URL,
        payload: `${WS_URL}?token=${getCookie("accessToken")}`,
      });

    return () => {
      dispatch({ type: wsActions.wsClose });
    };
  }, [dispatch]);

  if (orders?.length) {
    return (
        <section className={styles.content}>
          {orders?.reverse().map(order=><OrderCard key={order._id} order={order}/>)}
        </section>
    );
  }
   return null;
}
