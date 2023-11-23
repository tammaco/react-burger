import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import React from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { createPortal } from 'react-dom';

function Modal ({onClose, header, children})  {
    const modalRoot = document.getElementById("react-modals");
    

    React.useEffect(() => {
        const handleEscapeKey = (event) => {
            event.preventDefault();
            if (event.key === 'Escape') onClose();
        }

        document.body.addEventListener('keydown', handleEscapeKey)

        return () => {
            document.body.removeEventListener('keydown', handleEscapeKey);
        }
    }, [onClose])

    const modalContent = (
        <>
            <div className={styles.modal}>
              <div className={styles.modal_header}>
                <div className={styles.modal_title}>
                    <p className="text text_type_main-large">{header}</p>
                </div>
                <div className={styles.modal_close_btn}>
                    <CloseIcon type="primary" onClick={onClose} />
                </div>
              </div>
              {children}
          </div>
          <ModalOverlay onClose={() => onClose()}></ModalOverlay>
        </>
    );

    return createPortal(
        modalContent,
        modalRoot
    );
}

Modal.propTypes = {
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default Modal;