import React, { FunctionComponent, memo, ReactElement, useCallback, useEffect } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modalOverlay/modalOverlay";
import { createPortal } from "react-dom";
import { ESC_KEYCODE } from "../../constants/constants";
import { useHistory } from "react-router-dom";

export type TModal = {
  onClose?: () => void,
  headerText?: string,
  children: ReactElement
}

export const Modal:FunctionComponent<TModal> = memo(({ onClose, headerText, children }) => {
  let history = useHistory();

  const back = useCallback(
    () => {
      history.goBack();
    },
    [history]
  );

  const handleClickButton = () => {
    if (onClose) {
      onClose();
    } else {
      back();
    }
  };

  const escFunction = useCallback(
    (event: any) => {
      if (event.keyCode === ESC_KEYCODE) {
        if (onClose) {
          onClose();
        } else {
          back();
        }
      }
    },
    [onClose, back]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  const ModalComponent = (
    <>
      <ModalOverlay onClose={onClose || back} />
      <section className={`${styles.modal}`}>
        <>
        <header className={`ml-10 mt-10 mr-10 ${styles.header}`}>
          {headerText && (
            <p className="text text_type_main-large">{headerText}</p>
          )}
          <button onClick={handleClickButton} className={`${styles.button}`}>
            <CloseIcon type='primary' />
          </button>
        </header>
        {children}
        </>
      </section>
    </>
  );

  
    return createPortal(ModalComponent, document.getElementById("modal") as HTMLElement);
});
