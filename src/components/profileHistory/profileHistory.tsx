import React, {  useEffect } from "react";
import styles from "./profileHistory.module.css";

import { useDispatch, useSelector } from "react-redux";

import { TStore } from "../../services/reducers";
import { WS_CONNECTION_CLOSE, WS_START_WITH_CUSTOM_URL } from "../../services/actions/ws";
import { getCookie } from "../../utils/getCookie";
import { WS_URL } from "../../constants/constants";
import { OrderCard } from "../orderCard/orderCard";
import { CLEAR_PROFILE, getUserInfoReducer } from "../../services/actions";

export function ProfileHistory() {

  const { name, email, password, isChanged, isLoaded,orders } = useSelector(
    (state:TStore) => {
      return {
        isLoaded: state.auth.isLoaded,
        isChanged: state.profileForm.isChanged,
        name: state.profileForm.name,
        email: state.profileForm.email,
        password: state.profileForm.password,
        orders: state.wsOrders.orders,
      };
    }
  );

  const dispatch = useDispatch();
  

  useEffect(() => {
    if (isLoaded) {
      dispatch(getUserInfoReducer() as any);
    }

    return () => {
      dispatch({ type: CLEAR_PROFILE });
    };
  }, [dispatch, isLoaded]);
  
  useEffect(() => {
      dispatch({
        type: WS_START_WITH_CUSTOM_URL,
        payload: `${WS_URL}?token=${getCookie("accessToken")}`,
      });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
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
