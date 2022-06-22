import React from "react";
import error_image from "../../../images/error.png";

import styles from "./errorPage.module.css";

export function ErrorPage() {
  return (
    <section className={styles.content}>
      <p className="text text_type_main-large mt-10 mb-5">Ошибка 404 ;(</p>
      <img
        src={error_image}
        alt="Что-то пошло не так"
        className={styles.error_image}
      />
    </section>
  );
}
