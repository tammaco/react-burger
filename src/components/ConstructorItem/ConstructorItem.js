import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientItem } from '../../utils/types'
import PropTypes from 'prop-types';
import styles from './ConstructorItem.module.css';
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

function ConstructorItem({ item, index, moveItem }) {
    const ref = useRef(null);

    const [{isHover}, drop] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        hover(item, monitor) {
            if (!ref.current) 
                return;
            
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) 
                return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) 
                return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) 
                return;
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex
        },
    });

    const [, drag] = useDrag({
        type: 'ingredient',
        item: () => {
            return { item, index, moveItem }
        }
    });

    drag(drop(ref));

    return (
        <div className={`${isHover ? styles.isHover : ''} ${styles.layout}`}>
            <div className={styles.move} ref={ref} >
                <DragIcon type="primary"/>
            </div>
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image} />
        </div>
    )
}

ConstructorItem.propTypes = {
    item: ingredientItem.isRequired,
    index: PropTypes.number.isRequired,
    moveItem: PropTypes.func.isRequired
};

export default ConstructorItem;