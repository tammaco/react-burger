import { useCallback } from 'react';
import styles from './orders-board.module.css';

interface IOrdersBoard {
    completed: Array<number>;
    inWork: Array<number>;
    total: number;
    totalToday: number;
}

export function OrdersBoard({ completed, inWork, total, totalToday }: IOrdersBoard): React.JSX.Element {
    
    const renderCompletedColum = useCallback((columnIndex: number) => {
        const ORDERS_NUMBER_IN_COLUMN = 6;
        return (
            <div className={styles.completed_column}>
                { completed.slice(ORDERS_NUMBER_IN_COLUMN * columnIndex - ORDERS_NUMBER_IN_COLUMN, ORDERS_NUMBER_IN_COLUMN * columnIndex).map((item, index) => 
                { return  <p key={index} className='text text text_type_digits-default text_color_inactive'>{item}</p> })}
            </div>
        )
    }, [completed]);

    return (
        <div className={styles.layout}>
            <div className={styles.board}>
                <div>
                    <p className='text text_type_main-default mb-3'>Готовы: </p>
                    <div className={styles.completed_columns}>
                        {renderCompletedColum(1)}
                        {renderCompletedColum(2)}
                    </div>
                </div>
                <div className='pl-8'>
                    <p className='text text_type_main-default mb-3'>В работе: </p>
                    <div>
                        { inWork.map((item, index) => 
                        { return  <p key={index} className='text text text_type_digits-default'>{item}</p> })}
                    </div>
                </div>
           </div>
           <div className='mt-4'>
                <p className='text text_type_main-default'>Выполнено за все время:</p>
                <p className='text text text_type_digits-large'>{total}</p>
           </div>
           <div className='mt-4'>
                <p className='text text_type_main-default'>Выполнено за сегодня:</p>
                <p className='text text text_type_digits-large'>{totalToday}</p>
           </div>
        </div>
    )
}