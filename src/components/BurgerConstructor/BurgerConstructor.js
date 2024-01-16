import { useState, useCallback, useMemo } from 'react'
import styles from './BurgerConstructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useModal } from '../../hooks/useModal'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import ConstructorItem from '../ConstructorItem/ConstructorItem'
import BunItem from '../BunItem/BunItem'

import { useSelector, useDispatch } from 'react-redux'
import { addItem, reset, swapItems } from '../../services/actions/BurgerConstructor';
import { getConstructorItems, getBun, getTotalCost, getUser } from '../../services/selectors/BurgerConstructor';
import { useNavigate } from 'react-router-dom';

import { useDrop } from 'react-dnd'

function BurgerConstructor(props) {
    const [orderItemIds, setOrderItemIds] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const items = useSelector(getConstructorItems);
    const bun = useSelector(getBun);
    const totalCost = useSelector(getTotalCost);
    const user = useSelector(getUser);

    useMemo(() => {
        let ids = [];
        if (bun) ids.push(bun._id)
        if (items) ids = ids.concat(items.map(function (item) { return item._id; }));
        if (bun) ids.push(bun._id)
        setOrderItemIds(ids);
    }, [bun, items])

    const moveItem = useCallback(
        (dragIndex, dropIndex) => {
            dispatch(swapItems({ dragIndex: dragIndex, dropIndex: dropIndex }));
        }, [dispatch])

    const [{ isHover }, dropItem] = useDrop({
        accept: "item",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            dispatch(addItem(item));
        },
    });

    const renderConstructorItem = useCallback((item, index) => {
        return (
            <ConstructorItem key={item.key} item={item} index={index} moveItem={moveItem}></ConstructorItem>
        )
    }, [moveItem]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (user === null)
            navigate('/login', { state: { from: '/' } });
        else openModal();
    }

    const { isModalOpen, openModal, closeModal } = useModal(() => { dispatch(reset()) });

    return (
        <section className={styles.layout}>
            <BunItem pos="top" bun={bun}></BunItem>

            <div className={`${styles.components} ${isHover ? styles.isHover : ''}`} ref={dropItem}>
                {
                    items.length > 0
                        ? (items.map((item, index) => renderConstructorItem(item, index)))
                        : (
                            <div className={`${bun ? styles.ingredients_container : ''} constructor-element`}>
                                <span className="constructor-element__row">
                                    <span className={styles.constructor_cap_text}>Выберите ингредиенты</span>
                                </span>
                            </div>
                        )
                }
            </div>

            <BunItem pos="bottom" bun={bun}></BunItem>

            <div className={styles.order_info}>
                <div className={styles.price}>
                    <p className="text text_type_digits-default">{totalCost}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" disabled={!bun} onClick={onSubmit}>Оформить заказ</Button>
            </div>
            {isModalOpen && <Modal onClose={closeModal}><OrderDetails orderItemIds={orderItemIds} /></Modal>}
        </section>
    )
}

export default BurgerConstructor;