import styles from './ModalOverlay.module.css';

function ModalOverlay({onClose}) {

    return (
        <div className={styles.modal_overlay} onClick={onClose}></div>
    )
}

export default ModalOverlay;