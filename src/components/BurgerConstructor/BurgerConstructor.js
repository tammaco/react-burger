import React from 'react'
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientType } from '../../utils/types'
import  Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'

function BurgerConstructor(props) {

    const components = props.data;
    const bun = components?.data?.filter(x => x.type === 'bun')[0];

    const [isOpenOrderDetails, setIsOpenOrderDetails] = React.useState(false);

    const handleClick = () => {      
        setIsOpenOrderDetails(!isOpenOrderDetails);
    };

    return (
        <section className={styles.layout}>
             {
                components
                && components.success
                && components.data.length
                && (
                    <>
                    <div className={styles.bun}>
                        <ConstructorElement type='top' isLocked={true} text={bun.name + ' верх'} price={bun.price} thumbnail={bun.image} />
                    </div>
                    <div className={styles.components}>
                        {components.data.map((item, index) => 
                        item.type !== 'bun' && (<div key={item._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                isLocked={false}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image} /></div>)
                        )}
                    </div>
                    <div className={styles.bun}>
                        <ConstructorElement type='bottom' isLocked={true} text={bun.name + ' низ'} price={bun.price} thumbnail={bun.image} />
                    </div>
                    </>
                    )
             }
             <div className={styles.order_info}>
                <div className={styles.price}>
                    <p className="text text_type_digits-default">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={handleClick}>Оформить заказ</Button>
             </div>
             {isOpenOrderDetails && 
                    <Modal onClose={() => setIsOpenOrderDetails(false)}>
                        <OrderDetails />
                    </Modal>}
        </section>
    )
}

BurgerConstructor.propTypes = ingredientType;

export default BurgerConstructor;