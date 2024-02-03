import { OrdersBoard } from '../OrderBoard/orders-board';
import { OrderFeed } from '../OrderFeed/order-feed';
import styles from './feed.module.css';

export function Feed(): React.JSX.Element {
    return (
        <section className={styles.layout}>
           <OrderFeed></OrderFeed>
           <OrdersBoard></OrdersBoard>
        </section>
    )
}