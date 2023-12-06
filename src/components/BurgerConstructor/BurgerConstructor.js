import React, { useState, useCallback } from 'react'
import styles from './BurgerConstructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useModal } from '../../hooks/useModal'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import ConstructorItem from '../ConstructorItem/ConstructorItem'
import BunItem from '../BunItem/BunItem'

import { useSelector, useDispatch } from 'react-redux'
import { getConstructorItems, getBun, addItem, getTotalCost, reset } from '../../services/slices/BurgerConstructor';

import { useDrop } from 'react-dnd'

function BurgerConstructor(props) {
    const [orderItemIds, setOrderItemIds] = useState([]);

    const dispatch = useDispatch();
    const items = useSelector(getConstructorItems);
    const bun = useSelector(getBun);
    const totalCost = useSelector(getTotalCost)

    React.useMemo(() => {
        let ids = [];
        if (bun) ids.push(bun._id)
        if (items) ids = ids.concat(items.map(function (item) { return item._id; }));
        if (bun) ids.push(bun._id)
        setOrderItemIds(ids);
    }, [bun, items])

    const moveItem = useCallback(
        (dragIndex, dropIndex) => {
            const dragItem = items[dragIndex];
            const dropItem = items[dropIndex];

            items = items.splice(dragIndex, 1, dropItem);
            items = items.splice(dropIndex, 1, dragItem);
        },
        [items],
    )

    const [{ isHover }, dropItem] = useDrop({
        accept: "item",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            dispatch(addItem(item));
        },
    });

    const { isModalOpen, openModal, closeModal } = useModal(() => { dispatch(reset()) });

    return (
        <section className={styles.layout}>
            <BunItem pos="top" bun={bun}></BunItem>

            <div className={`${styles.components}${isHover ? styles.isHover : ''}`} ref={dropItem}>
                {
                    items.length > 0
                        ? (
                            items.map((item, index) => (
                                <div className={styles.component} key={index}>
                                    <ConstructorItem item={item}></ConstructorItem>
                                </div>))
                        ) : (
                            <div className={`constructor-element`}>
                                <span className="constructor-element__row">
                                    <span className={styles.constructor_cap_text}>Выберите ингредиенты</span>
                                </span>
                            </div>)
                }
            </div>

            <BunItem pos="bottom" bun={bun}></BunItem>

            <div className={styles.order_info}>
                <div className={styles.price}>
                    <p className="text text_type_digits-default">{totalCost}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={openModal}>Оформить заказ</Button>
            </div>
            {isModalOpen && <Modal onClose={closeModal}><OrderDetails orderItemIds={orderItemIds} /></Modal>}
        </section>
    )
}

export default BurgerConstructor;