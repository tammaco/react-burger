import { useState, useCallback, useMemo, SyntheticEvent } from 'react'
import styles from './BurgerConstructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useModal } from '../../hooks/useModal'
import Modal from '../Modal/Modal'
import OrderDetails from '../Orders/OrderDetails/OrderDetails'
import ConstructorItem from '../ConstructorItem/ConstructorItem'
import BunItem from '../BunItem/BunItem'

import { useSelector, useDispatch } from 'react-redux'
import { addItem, reset, swapItems } from '../../services/slices/burgerSlice';
import { getConstructorItems, getBun, getTotalCost } from '../../services/selectors/constructorSelector';
import { getUser } from '../../services/selectors/userSelector';
import { useNavigate } from 'react-router-dom';

import { IDragDrop, IIngredientItem } from '../../utils/types'

import { useDrop } from 'react-dnd'

function BurgerConstructor(): React.JSX.Element {
    const [orderItemIds, setOrderItemIds] = useState<string[]>([]);
    const [isHover, setIsHover] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const items: [IIngredientItem] = useSelector(getConstructorItems);
    const bun = useSelector(getBun);
    const totalCost = useSelector(getTotalCost);
    const user = useSelector(getUser);

    useMemo(() => {
        let ids: string[] = [];
        if (bun) ids.push(bun._id)
        if (items) ids = ids.concat(items.map((item) => { return item._id; }));
        if (bun) ids.push(bun._id)
        setOrderItemIds(ids);
    }, [bun, items])

    const moveItem = useCallback(
        (dragIndex: number, dropIndex: number) => {
            const obj: IDragDrop = { dragIndex: dragIndex, dropIndex: dropIndex };
            dispatch(swapItems(obj));
        }, [dispatch])

    const [, dropItem] = useDrop<IIngredientItem, unknown>({
        accept: "item",
        collect: monitor => {
            setIsHover(monitor.isOver());
        },
        drop(item: IIngredientItem) {
            dispatch(addItem(item));
        },
    });

    const renderConstructorItem = useCallback((item: IIngredientItem, index: number) => {
        return (
            <ConstructorItem key={item.key} ingredient={item} index={index} moveItem={moveItem}></ConstructorItem>
        )
    }, [moveItem]);

    const onSubmit = (e: SyntheticEvent) => {
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