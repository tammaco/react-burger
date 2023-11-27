import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientItem } from '../../utils/types'

function ConstructorItem({ item })
{
    return(
        <>
            <DragIcon type="primary" />
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image} />
        </>
    )
}

ConstructorItem.propTypes = {
    item: ingredientItem
};

export default ConstructorItem;