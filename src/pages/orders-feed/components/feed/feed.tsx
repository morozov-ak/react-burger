import React from "react";
import styles from "./feed.module.css";

import { TStore } from "../../../../services/reducers";
import { OrderCard } from "../../../../components/orderCard/orderCard";
import { useSelector } from "../../../../services/hooks";



export function Feed() {

  const { orders } = useSelector(
    (state) => {
      return {
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
