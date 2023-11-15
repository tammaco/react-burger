import React from 'react'
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerConstructor(props) {

    const components = props.data;
    const length = components?.data?.length;

    return (
        <section className={styles.layout}>
            <div className={styles.components}>
             {
                components
                && components.success
                && components.data.length
                && (
                    components.data.map((item, index) => 
                    <div key={index}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        key={index}
                        type={index === 0 ? 'top' : index === length - 1 ? 'bottom' : ''}
                        isLocked={index === 0 || index === length - 1 ? true : false}
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image} />
                    </div>
                    ))
             }
             </div>
             <div className={styles.order_info}>
                <div className={styles.price}>
                    <p className="text text_type_digits-default">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
             </div>
        </section>
    )
}

export default BurgerConstructor;