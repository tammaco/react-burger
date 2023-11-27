import React from 'react'
import styles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { apiurl } from '../../services/api'
import PropTypes from 'prop-types';

function OrderDetails (props) {

    const [orderNumber, setOrderNumber] = React.useState(null);

    const getOrderNumber = () => {
        fetch(apiurl + 'orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ 'ingredients': props.children })
          })
          .then(res =>
            {
              if (res.ok) 
                  return res.json();
              return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(data => {
              if (data.success && data.order !== null && data.order.number)
                setOrderNumber(data.order.number);
              else
                console.log("Неудачная попытка получения номера заказа");
            })
            .catch(e => {
              console.log("error", e);
            });
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

OrderDetails.propTypes = PropTypes.arrayOf(PropTypes.string);

export default OrderDetails;