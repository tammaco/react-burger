import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';
import React from 'react'

function ModalOverlay({onClose}) {
    const modalContainerRef = React.useRef(null);

    React.useEffect(() => {
        const handleOverlayClick = (event) => {
            event.preventDefault();
            if (event.target === modalContainerRef.current) onClose();
        };

        document.body.addEventListener('click', handleOverlayClick);

        return () => {
            document.body.removeEventListener('click', handleOverlayClick);
        }
    }, [onClose])

    return (
        <div className={styles.modal_overlay}  ref={modalContainerRef}></div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default ModalOverlay;