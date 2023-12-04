import React from 'react'
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import  { useModal } from '../../hooks/useModal'
import  Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import ConstructorItem from '../ConstructorItem/ConstructorItem'
import BunContainer from '../BunContainer/BunContainer'

import { useSelector } from 'react-redux'
import { getConstructorItems, addBun, addItem } from '../../services/slices/BurgerConstructor';

import { useDrop } from 'react-dnd'

function BurgerConstructor(props) {

    const items =  useSelector(getConstructorItems);

    const [{ isHover }, dropItem] = useDrop({
        accept: "item",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            addItem(item);
        },
    });

    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <section className={styles.layout}>
                {
                    items.length > 0 ?
                    (
                        <>
                            {/* <div className={styles.bun}>
                                <ConstructorElement type='top' isLocked={true} text={bun.name + ' (верх)'} price={bun.price} thumbnail={bun.image} />
                            </div>
                            <div className={styles.components}>
                                {ingredients.map((item, index) => (<div key={index}><ConstructorItem item={item}></ConstructorItem></div>)) }
                            </div>
                            <div className={styles.bun}>
                                <ConstructorElement type='bottom' isLocked={true} text={bun.name + ' (низ)'} price={bun.price} thumbnail={bun.image} />
                            </div> */}
                        </>
                    )
                    : (
                        <>
                        <div className={styles.components}>
                        <BunContainer pos="top"></BunContainer>
                            
                            <div className="constructor-element" ref={dropItem}>
                                <span className="constructor-element__row"><span className="constructor-element__text">Начинка</span></span>
                            </div>
                            
                            <BunContainer pos="bottom"></BunContainer>
                        </div>
                        </>
                    )
                }
                <div className={styles.order_info}>
                        <div className={styles.price}>
                            <p className="text text_type_digits-default">{777}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <Button htmlType="button" type="primary" size="large" onClick={openModal}>Оформить заказ</Button>
                </div>
                {isModalOpen && <Modal onClose={closeModal}><OrderDetails orderItemIds={[]} /></Modal>}
        </section>
    )
}

export default BurgerConstructor;