import styles from './ModalOverlay.module.css';
import React from 'react'

interface IModalOverlayProps {
    onClose: (() => void) | undefined;
}

function ModalOverlay({ onClose }: IModalOverlayProps) {
    const modalContainerRef = React.useRef(null);

    React.useEffect(() => {
        const handleOverlayClick = (ev: MouseEvent) => {
            ev.preventDefault();
            if (ev.target === modalContainerRef.current && onClose) onClose();
        };

        document.body.addEventListener('click', handleOverlayClick);

        return () => {
            document.body.removeEventListener('click', handleOverlayClick);
        }
    }, [onClose])

    return (
        <div className={styles.modal_overlay} ref={modalContainerRef} data-testid="modal_overlay"></div>
    )
}

export default ModalOverlay;