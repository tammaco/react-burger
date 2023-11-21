import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import React from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { createPortal } from 'react-dom';

function Modal ({isOpen, onClose, header, children})  {
    const modalRoot = document.getElementById("react-modals");

    React.useEffect(() => {
        const closeOnEscapeKey = (event) => {
            event.preventDefault();
            if (event.key === 'Escape') onClose()
        }

        document.body.addEventListener('keydown', closeOnEscapeKey)

        return () => document.body.removeEventListener('keydown', closeOnEscapeKey)
    }, [onClose])

    const modalContent = isOpen ? (
        <>
            <div className={styles.modal}>
              <div className={styles.modal_header}>
                <div className={styles.modal_title}>
                    <p className="text text_type_main-large">{header}</p>
                </div>
                <span className={styles.modal_close_btn}>
                    <CloseIcon type="primary" onClick={onClose} />
                </span>
              </div>
              {children}
          </div>
          <ModalOverlay onClose={onClose} />
        </>
    ) : null;

    return createPortal(
        modalContent,
        modalRoot
    );
}

Modal.propTypes = {
    header: PropTypes.string,
    isOpen: PropTypes.bool,   
    onClose: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Modal;