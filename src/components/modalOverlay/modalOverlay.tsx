import React, { useRef, useEffect, memo, useCallback } from "react";
import styles from "./modalOverlay.module.css";

export type TModalOverlay = {
  onClose: () => void,
}

export const ModalOverlay = memo(({ onClose }:TModalOverlay) => {
  const overlayRef = useRef<HTMLLIElement>(null);

  const handleOverlayClick = useCallback(
    (event:any) => {
      if (overlayRef.current === event.target) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
   
  const element = overlayRef.current;
  if(element){
    element.addEventListener("click", handleOverlayClick);
    return () => element.removeEventListener("click", handleOverlayClick);
  }
  }, [handleOverlayClick]);

  return <section className={`${styles.overlay}`} ref={overlayRef} />;
});

