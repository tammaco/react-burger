import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredientItem, IDragObject, TMoveItemFunction } from '../../utils/types'
import styles from './ConstructorItem.module.css';
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../../services/actions/BurgerConstructor';

interface IConstructorItemProps {
    item: IIngredientItem;
    index: number;
    moveItem: TMoveItemFunction
}

function ConstructorItem({ item, index, moveItem }: IConstructorItemProps): React.JSX.Element {
    const ref = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();

    function instanceOfIDragObject(item: any): item is IDragObject {
        return true;
    }

    const [isHover, drop] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        hover(item: IDragObject | unknown, monitor) {
            if (!ref.current)
                return;

            let dragIndex: number | undefined = 0;
            if (instanceOfIDragObject(item))
                dragIndex = item.index;

            const hoverIndex = index;

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            if (dragIndex && dragIndex < hoverIndex && hoverClientY < hoverMiddleY)
                return;
            if (dragIndex && dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
                return;
            moveItem(dragIndex, hoverIndex);
            if (instanceOfIDragObject(item))
                item.index = hoverIndex;
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
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => dispatch(deleteItem(item))} />
        </div>
    )
}

export default ConstructorItem;