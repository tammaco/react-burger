import { addBun } from '../../services/slices/burgerSlice'
import { useDrop } from 'react-dnd'
import { useAppDispatch } from '../hooks'
import styles from '../BunItem/BunItem.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { TIngredientItem } from '../../utils/types'
import { useState } from 'react';

interface IBunItemProps {
    bun: TIngredientItem | null;
    pos: 'top' | 'bottom'
}

export default function BunItem({ bun, pos }: IBunItemProps): React.JSX.Element {
    const dispatch = useAppDispatch();
    const [isHover, setIsHover] = useState(false);

    const [, refDrop] = useDrop<TIngredientItem, unknown>({
        accept: "bun",
        collect: monitor => {
            setIsHover(monitor.isOver());
        },
        drop(item: TIngredientItem) {
            dispatch(addBun(item));
        },
    });

    return (
        bun ?
            (

                <div className={styles.bun} ref={refDrop}>
                    <ConstructorElement type={pos} isLocked={true} text={bun.name + ' (верх)'} price={bun.price} thumbnail={bun.image} />
                </div>
            )
            :
            (
                <div className={`${isHover ? styles.isHover : ''} ${styles.bun} constructor-element constructor-element_pos_${pos}`} ref={refDrop}>
                    <span className="constructor-element__row"><span className={styles.constructor_cap_text}>Выберите булки</span></span>
                </div>
            )
    )
}