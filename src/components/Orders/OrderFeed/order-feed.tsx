import { useCallback, useEffect, useState } from "react";
import styles from './order-feed.module.css';
import { IOrderFeedItem } from "../../../utils/types";
import { OrderCard } from "../OrderCard/order-card";
import { Link, useLocation, useMatch } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../../services/wsApi";
import { ORDERS_ALL_URL, ORDERS_URL, SOCKET_BASE_URL } from "../../../utils/constants";
import { OrdersBoard } from "../OrderBoard/orders-board";
import { isValidOrder } from "../../../utils/actions";

export function OrderFeed(): React.JSX.Element {
    const match = useMatch('/feed');
    const location = useLocation();
    const accessToken = localStorage.getItem("accessToken")?.replace("Bearer ", "") || '';
    const { data } = useGetAllOrdersQuery(SOCKET_BASE_URL + (match ? ORDERS_ALL_URL : `${ORDERS_URL}?token=${accessToken}`));
    const [completed, setCompleted] = useState<number[] | []>([]);
    const [inWork, setInWork] = useState<number[] | []>([]);

    useEffect(() => {
       if (data && isValidOrder(data))
       {
            setCompleted(data?.orders.filter(x => x.status === 'done').map(x => x.number));
            setInWork(data?.orders.filter(x => x.status === 'pending').map(x => x.number));
       }
    }, [data, localStorage])
    
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
        isValidOrder(data) ?
        (<section className={styles.section}>
            <div className={styles.layout}>
                { match &&  <div className={styles.title}>
                    <p className="text text_type_main-large">Лента заказов</p>
                </div> }
                { Array.isArray(data.orders) && 
                    <div className={styles.orders}>
                        {data.orders.map((item, index) => renderOrderCard(item, index))}
                    </div>
                }
            </div>
            {match && (<OrdersBoard total={data.total} totalToday={data.totalToday} completed={completed} inWork={inWork} ></OrdersBoard>)}
        </section>) 
        : <></>
    )
}