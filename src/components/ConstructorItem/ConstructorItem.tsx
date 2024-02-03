import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredientItem } from '../../utils/types'
import styles from './ConstructorItem.module.css';
import { useRef, useState } from 'react'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../../services/slices/burgerSlice';

type TMoveItemFunction = (dragIndex: number, dropIndex: number) => void;

interface IConstructorItemProps {
    ingredient: IIngredientItem;
    index: number;
    moveItem: TMoveItemFunction
}

interface IDragObject {
    index: number;
}

function ConstructorItem({ ingredient, index, moveItem }: IConstructorItemProps): React.JSX.Element {
    const ref = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();
    const [isHover, setIsHover] = useState(false);

    const [, drop] = useDrop<IDragObject, unknown>({
        accept: 'ingredient',
        collect: monitor => {
            setIsHover(monitor.isOver());
        },
        hover(item: IDragObject, monitor: DropTargetMonitor) {
            if (!ref.current)
                return;

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            if (dragIndex && dragIndex < hoverIndex && hoverClientY < hoverMiddleY)
                return;
            if (dragIndex && dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
                return;
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [, drag] = useDrag({
        type: 'ingredient',
        item: () => {
            return { ingredient, index, moveItem }
        }
    });

    drag(drop(ref));

    return (
        <div className={`${isHover ? styles.isHover : ''} ${styles.layout}`}>
            <div className={styles.move} ref={ref} >
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                isLocked={false}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => dispatch(deleteItem(ingredient))} />
        </div>
    )
}

export default ConstructorItem;