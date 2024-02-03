import styles from './IngredientItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredientItem } from '../../utils/types'

import { useDrag } from 'react-dnd'

import { useSelector } from 'react-redux'
import { getOrderDetails } from '../../services/selectors/constructorSelector';

import { Link, useLocation } from 'react-router-dom';

function IngredientItem({item} : { item: IIngredientItem }) : React.JSX.Element {
    const orderDetails = useSelector(getOrderDetails);
    const count = orderDetails.find((x: { _id: string; }) => x._id === item._id)?.quantity;
    const ingredientId = item['_id'];
    const location = useLocation();

    const [, drag] = useDrag({
        type: item.type === "bun" ? "bun" : "item",
        item: item,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        <Link
        key={ingredientId}
        to={`/ingredients/${ingredientId}`}
        state={{ background: location }}
        className={styles.link}
      >
            <div className={styles.ingredient_item_content} ref={drag}>
                {count != undefined && count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
                <img src={item.image} alt={item.name}></img>
                <div className={styles.ingredient_item_price}>
                    <p className="text text_type_digits-default">{item.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={styles.ingredient_item_name}>
                    <p className="text text_type_main-small">{item.name}</p>
                </div>
            </div>
        </Link>
    )
}

export default IngredientItem;