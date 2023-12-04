import React from 'react'
import styles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import request from '../../utils/request'
import PropTypes from 'prop-types';

function OrderDetails ({ orderItemIds }) {

    const [orderNumber, setOrderNumber] = React.useState(null);

    const getOrderNumber = () => {
        request('orders', { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' }
            , body: JSON.stringify({ 'ingredients': orderItemIds})})
            .then(data =>  setOrderNumber(data.order.number));
      };

    React.useEffect(
        () => { getOrderNumber(); }, []
    );

    return (
        <div className={styles.content}>
             <p className="text text_type_digits-large">{orderNumber}</p>
             <p className='pt-4 pb-15 text text_type_main-medium'>идентификатор заказа</p>
             <div className={styles.done}>
                <div className={styles.done_img}>
                    <CheckMarkIcon type="primary" />
                </div>
             </div>
             <p className='pt-15 text text_type_main-default'>Ваш заказ начали готовить</p>
             <p className='pt-2 pb-30 text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    orderItemIds: PropTypes.arrayOf(PropTypes.string)
}

export default OrderDetails;