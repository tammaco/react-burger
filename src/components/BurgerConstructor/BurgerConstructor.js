import React from 'react'
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

function BurgerConstructor(props) {

    const components = props.data;
    const bun = components?.data?.filter(x => x.type == 'bun')[0];

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
                        item.type != 'bun' && (<div key={item._id}>
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
                <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
             </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.shape({
        success: PropTypes.bool,
        data: PropTypes.arrayOf(PropTypes.shape({
                _id: PropTypes.string,
                type: PropTypes.string,
                name: PropTypes.string,
                price: PropTypes.number,
                calories: PropTypes.number,
                carbohydrates: PropTypes.number,
                fat: PropTypes.number,
                proteins: PropTypes.number,
                image: PropTypes.string,
                image_large: PropTypes.string,
                image_mobile: PropTypes.string,
            }))
    })
};

export default BurgerConstructor;