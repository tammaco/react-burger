
import { useCallback } from 'react';
import styles from './order-header.module.css';
import { IOrderFeedItem, MOrderStatuses, TOrderStatus } from '../../../utils/types';

export function OrderHeader({order} : { order: IOrderFeedItem }): React.JSX.Element {
    
    const renderStatusName = useCallback((status: TOrderStatus) => {
        const statusInfo = MOrderStatuses.get(status);
        return (
            <p className={`${statusInfo?.style} text text_type_main-small`}>{statusInfo?.name}</p>
        )
    }, [])

    return (
        <div className={styles.order_info}>
        <p className="text text_type_main-medium">{order.name}</p>
            { renderStatusName(order.status) }
        </div>
    )
}