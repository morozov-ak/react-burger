import React, {  useEffect } from "react";
import styles from "./feed.module.css";

import { useDispatch, useSelector } from "react-redux";
import { TStore } from "../../../../services/reducers";
import { CLEAR_PROFILE, getUserInfoReducer } from "../../../../services/actions";
import { OrderCard } from "../../../../components/orderCard/orderCard";



export function Feed() {

  const { isLoaded,orders } = useSelector(
    (state:TStore) => {
      return {
        isLoaded: state.auth.isLoaded,
        orders: state.wsOrders.orders,
      };
    }
  );

  if (orders?.length) {
    return (
        <section className={styles.content}>
          {orders?.map(order=><OrderCard key={order._id} type='feed' order={order}/>)}
        </section>
    );
  }
   return null;
}
