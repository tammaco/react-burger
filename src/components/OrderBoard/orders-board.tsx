import styles from './orders-board.module.css';

export function OrdersBoard(): React.JSX.Element {
    return (
        <div className={styles.layout}>
            <div className={styles.board}>
                <div>
                    <p className='text text_type_main-default mb-3'>Готовы: </p>
                    <div>
                        <p className='text text text_type_digits-default text_color_inactive'>00001</p>
                        <p className='text text text_type_digits-default text_color_inactive'>00001</p>
                        <p className='text text text_type_digits-default text_color_inactive'>00001</p>
                        <p className='text text text_type_digits-default text_color_inactive'>00001</p>
                        <p className='text text text_type_digits-default text_color_inactive'>00001</p>
                        <p className='text text text_type_digits-default text_color_inactive'>00001</p>
                        <p className='text text text_type_digits-default text_color_inactive'>00001</p>
                    </div>
                </div>
                <div className='pl-8'>
                    <p className='text text_type_main-default mb-3'>В работе: </p>
                    <div>
                        <p className='text text text_type_digits-default'>00001</p>
                        <p className='text text text_type_digits-default'>00001</p>
                        <p className='text text text_type_digits-default'>00001</p>
                        <p className='text text text_type_digits-default'>00001</p>
                    </div>
                </div>
           </div>
           <div className='mt-4'>
                <p className='text text_type_main-default'>Выполнено за все время:</p>
                <p className='text text text_type_digits-large'>7777777</p>
           </div>
           <div className='mt-4'>
                <p className='text text_type_main-default'>Выполнено за сегодня:</p>
                <p className='text text text_type_digits-large'>777</p>
           </div>
        </div>
    )
}