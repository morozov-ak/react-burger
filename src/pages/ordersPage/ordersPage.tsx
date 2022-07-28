import React, {  FunctionComponent,  } from "react";
import styles from "./ordersPage.module.css";
import { ProfileSidebar } from "../../components/profileSidebar/profileSidebar";
import { ProfileHistory } from "../../components/profileHistory/profileHistory";

export const OrdersPage:FunctionComponent = () => {
    return (
      <div className={styles.content}>
        <ProfileSidebar/>
        <ProfileHistory/>
      </div>
    );

}
