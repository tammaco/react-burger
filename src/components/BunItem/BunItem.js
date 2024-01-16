import { addBun } from '../../services/actions/BurgerConstructor'
import { useDrop } from 'react-dnd'
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux'
import styles from '../BunItem/BunItem.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientItem } from '../../utils/types'

export default function BunItem({ bun, pos }) {
    const dispatch = useDispatch();

    const [{ isHover }, refDrop] = useDrop({
        accept: "bun",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
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

BunItem.propTypes = {
    bun: ingredientItem || null,
    pos: PropTypes.string.isRequired
};