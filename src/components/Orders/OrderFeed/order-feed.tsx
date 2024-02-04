import { useCallback } from "react";
import styles from './order-feed.module.css';
import { IOrderFeedItem } from "../../../utils/types";
import { OrderCard } from "../OrderCard/order-card";
import { Link, useLocation, useMatch } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../../hooks/useSocket";
import { ORDERS_ALL_URL, ORDERS_URL, SOCKET_BASE_URL } from "../../../utils/constants";

export function OrderFeed(): React.JSX.Element {
    const match = useMatch('/feed');
    const location = useLocation();
    const accessToken = localStorage.getItem("accessToken")?.replace("Bearer ", "") || '';
    const { data } = useGetAllOrdersQuery(SOCKET_BASE_URL + (match ? ORDERS_ALL_URL : `${ORDERS_URL}?token=${accessToken}`));
    
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
            { data !== undefined && Array.isArray(data[0]?.orders) && 
                <div className={styles.orders}>
                    {data[0]?.orders.map((item, index) => renderOrderCard(item, index))}
                </div>
            }
        </div>
    )
}