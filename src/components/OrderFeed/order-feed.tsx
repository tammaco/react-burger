import { useCallback } from "react";
import { useGetProfileOrdersQuery } from "../../hooks/useApi";
import styles from './order-feed.module.css';
import { IOrderFeedItem } from "../../utils/types";
import { OrderCard } from "../OrderCard/order-card";
import { Link, useLocation, useMatch } from "react-router-dom";

export function OrderFeed(): React.JSX.Element {
    const { data: orders } = useGetProfileOrdersQuery(null);
    const match = useMatch('/feed');
    const location = useLocation();
    
    const renderOrderCard = useCallback((order: IOrderFeedItem, index: number) => {
        return (
            <div key={index}>
                 <Link key={order.number}
                       to={`${match ? `/feed/${order.number}` : `/profile/orders/${order.number}`}`}
                       state={{ background: location }}
                       className={styles.link}>
                    <OrderCard order={order} />
                </Link>
            </div>
        )
    }, [])

    return (
        <div className={styles.layout}>
            { match &&  <div className={styles.title}>
                <p className="text text_type_main-large">Лента заказов</p>
            </div> }
            { orders !== undefined && Array.isArray(orders) && 
                <div className={styles.orders}>
                    {orders.map((item, index) => renderOrderCard(item, index))}
                </div>
            }
        </div>
    )
}