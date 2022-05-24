import React, {  useRef, useEffect, memo, useCallback } from 'react';
import styles from './modalOverlay.module.css';
import PropTypes from 'prop-types'

export const ModalOverlay = memo(({onClose}) => {

  const overlayRef = useRef(null)

  const handleOverlayClick = useCallback((event) => {
    if (overlayRef.current === event.target){
      onClose()
    }
  },[onClose]) 

  useEffect(
    ()=>{
      const element = overlayRef.current
      element.addEventListener('click', handleOverlayClick)
      return () => element.removeEventListener('click', handleOverlayClick)
    },[handleOverlayClick]
  )

  return (
      <section className={`${styles.overlay}`} ref={overlayRef}/>
  );
}) 

ModalOverlay.propTypes = {
  onClose:  PropTypes.func,
}

