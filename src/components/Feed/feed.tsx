import { OrdersBoard } from '../Orders/OrderBoard/orders-board';
import { OrderFeed } from '../Orders/OrderFeed/order-feed';
import styles from './feed.module.css';

export function Feed(): React.JSX.Element {
    return (
        <section className={styles.layout}>
           <OrderFeed></OrderFeed>
           <OrdersBoard></OrdersBoard>
        </section>
    )
}