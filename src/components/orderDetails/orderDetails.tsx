import React, { memo } from "react";
import styles from "./orderDetails.module.css";
import doneImage from "../../images/done.gif";

export type TOrderDetails = {
  orderNumber: number,
}

export const OrderDetails = memo(({ orderNumber }:TOrderDetails) => {
  return (
    <section className={`pb-30 pt-10 ${styles.card}`}>
      <p className={`text text_type_digits-large ${styles.orderNumber}`}>
        {orderNumber}
      </p>
      <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
      <img className={`mt-15 mb-15`} src={doneImage} alt="done" />
      <p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default mt-2  text_color_inactive`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </section>
  );
});
