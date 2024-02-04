import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-total-cost.module.css';

export function OrderTotalCost({totalCost} : { totalCost: number }): React.JSX.Element {
    return (
        <div className={styles.total_cost}>
            <p className="text text_type_digits-default">{totalCost}</p>&nbsp;<CurrencyIcon type="primary" />
        </div>
    )
}