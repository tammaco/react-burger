import styles from './orders-history.module.css';

export function OrdersHistory(): React.JSX.Element {
    return (
        <div className={styles.layout}>
            <p className="text text_type_main-default">
                Здесь будет история заказов
            </p>
        </div>)
}