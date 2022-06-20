import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

import styles from "./ordersPage.module.css";

export function OrdersPage() {
  return (
    <section className={styles.content}>
      <div className={styles.logo_image}>
        <Logo />
      </div>
    </section>
  );
}
