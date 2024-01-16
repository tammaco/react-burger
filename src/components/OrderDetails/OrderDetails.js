import styles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { useSendOrderQuery } from '../../hooks/useApi'
import { Loading } from '../loading';

function OrderDetails({ orderItemIds }) {
    const { isLoading: loading, error, data } = useSendOrderQuery(orderItemIds);

    return (
        <div className={styles.content}>
            { loading && <Loading isLoading={true} />}
            {!loading && error && <Loading isLoading={false} isError={true} /> }
            {!error && data?.order?.number &&
                <><p className="text text_type_digits-large">{data?.order?.number}</p>
                    <p className='pt-4 pb-15 text text_type_main-medium'>идентификатор заказа</p>

                    <div className={styles.done}>
                        <div className={styles.done_img}>
                            <CheckMarkIcon type="primary" />
                        </div>
                    </div>

                    <p className='pt-15 text text_type_main-default'>Ваш заказ начали готовить</p>
                    <p className='pt-2 pb-30 text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
                </>}
        </div>
    )
}

OrderDetails.propTypes = {
    orderItemIds: PropTypes.arrayOf(PropTypes.string)
}

export default OrderDetails;