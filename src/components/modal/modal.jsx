import React, { memo, useCallback, useEffect } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ModalOverlay } from "../modalOverlay/modalOverlay";
import { createPortal } from "react-dom";
import { ESC_KEYCODE } from "../../constants/constants";
import { useHistory } from "react-router-dom";

export const Modal = memo(({ onClose, headerText, children }) => {
  let history = useHistory();

  const back = useCallback(
    (e) => {
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
    (event) => {
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
        <header className={`ml-10 mt-10 mr-10 ${styles.header}`}>
          {headerText && (
            <p className="text text_type_main-large">{headerText}</p>
          )}
          <button onClick={handleClickButton} className={`${styles.button}`}>
            <CloseIcon />
          </button>
        </header>
        {children}
      </section>
    </>
  );

  const modalHtmlElement = document.getElementById("modal");
  if (modalHtmlElement) {
    return createPortal(ModalComponent, modalHtmlElement);
  }
});

Modal.propTypes = {
  children: PropTypes.element,
  onClose: PropTypes.func,
  headerText: PropTypes.string,
};
