import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import React, { PropsWithChildren } from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { createPortal } from 'react-dom';

interface IModalProps {
    header?: string;
    onClose: (() => void) | undefined;
}

function Modal({ onClose, header, children }: PropsWithChildren<IModalProps>) {
    const modalRoot: Element | null = document.querySelector("#react-modals");

    React.useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            event.preventDefault();
            if (event.key === 'Escape' && onClose) onClose();
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
            <ModalOverlay onClose={() => onClose ? onClose() : () => { }}></ModalOverlay>
        </>
    );

    return modalRoot ? createPortal(
        modalContent, modalRoot
    ) : null;
}

export default Modal;