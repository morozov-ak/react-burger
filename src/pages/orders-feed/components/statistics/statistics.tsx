import React, { useMemo } from "react";
import styles from "./statistics.module.css";
import { useSelector } from "react-redux";
import { TStore } from "../../../../services/reducers";

export function Statistics() {

  const {  orders, total, totalToday } = useSelector(
    (state:TStore) => {
      return {
        total: state.wsOrders.total,
        totalToday: state.wsOrders.totalToday,
        orders: state.wsOrders.orders,
      };
    }
  );

  const {ready, pending} = useMemo(() => {
    let ready:Array<number> = [] 
    let pending:Array<number> = []
    
    orders.forEach(order => {
      if(order.status === 'pending'){
        pending.push(order.number)
      }
      if(order.status === 'done'){
        ready.push(order.number)
      }
    })

    return {ready, pending}
  },[orders])

  if (orders?.length) {
    return (
        <section className={styles.content}>
          <div className={styles.ordersNumbers}>
            <div className={styles.column}>
              <span className="text text_type_main-medium">
                Готовы:
              </span>
              <div className={styles.ready}>
                {
                  ready.map((order)=><span key={order} className="text text_type_digits-medium">{order}</span>)
                }
              </div>
              

            </div>
            <div className={styles.column }>
              <span className="text text_type_main-medium">
                В работе:
              </span>
              <div className={styles.pending}>
                {
                  pending.map((order)=><span key={order} className="text text_type_digits-medium">{order}</span>)
                }
              </div>
              
            </div>
          </div>

          <span className="text text_type_main-medium">
            Выполнено за все время:
          </span>

          <span className="text text_type_digits-large">
            {total}
          </span>

          <span className="text text_type_main-medium">
          Выполнено за сегодня:
          </span>

          <span className="text text_type_digits-large">
            {totalToday}
          </span>

        </section>
        
      
    );
  }
   return null;
}
