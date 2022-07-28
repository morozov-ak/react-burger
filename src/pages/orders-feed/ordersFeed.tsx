import styles from "./ordersFeed.module.css";
import { useEffect } from "react";

import { wsActions } from "../../services/actions/ws";
import { Feed } from "./components/feed/feed";
import { Statistics } from "./components/statistics/statistics";
import { useDispatch } from "../../services/hooks";

const OrdersFeed = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch({ type: wsActions.wsInit });

    return () => {
      dispatch({ type: wsActions.wsClose });
    };
  }, [dispatch]);


  return (
      <div className={styles.wrapper}>
        <div className={styles.pageTitle}>
          <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        </div>
        
        <div className={styles.content}>
          <div className={styles.halfPage}>
            <Feed/>
          </div>
          <div className={styles.halfPage}>
            <Statistics />
          </div>
        </div>
      </div>
  );
};

export default OrdersFeed;
