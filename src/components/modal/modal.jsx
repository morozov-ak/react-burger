import React, { memo, useCallback, useEffect } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types'
import { ModalOverlay } from '../modalOverlay/modalOverlay';
import { createPortal } from 'react-dom';
import { ESC_KEYCODE } from '../../constants/constants';

export const Modal = memo(({onClose,headerText,children}) => {

  const handleClickButton = () => {
    setTimeout(onClose,0) // magic
  }
  
  const escFunction = useCallback((event) => {
    if(event.keyCode === ESC_KEYCODE) {
      onClose();
    }
  },[onClose]) 

  useEffect(()=>{
    document.addEventListener("keydown", escFunction, false);
    return ()=>{document.removeEventListener("keydown", escFunction, false);}
  },[escFunction])

  return (createPortal(
    <>
      <ModalOverlay onClose={onClose}/>
      <section className={`${styles.modal}`} >
        <header className={`ml-10 mt-10 mr-10 ${styles.header}`} >  
          {headerText && <p className="text text_type_main-large">{headerText}</p>}
          <button onClick={handleClickButton} className={`${styles.button}`}>
            <CloseIcon/>
          </button>
        </header>
        {children}
      </section>  
    </>, 
    document.getElementById('modal'))
  );
}) 

Modal.propTypes = {
  children: PropTypes.element,
  onClose: PropTypes.func,
  headerText: PropTypes.string
}

