import styles from './IngredientItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientItem } from '../../utils/types'

import { useDrag } from 'react-dnd'

import { useSelector } from 'react-redux'
import { getOrderDetails } from '../../services/selectors/BurgerConstructor';

import { Link, useLocation } from 'react-router-dom';

function IngredientItem({item}) {
    const orderDetails = useSelector(getOrderDetails);
    const count = orderDetails.find(x => x._id === item._id)?.quantity;
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
        // Тут мы формируем динамический путь для нашего ингредиента
        to={`/ingredients/${ingredientId}`}
        // а также сохраняем в свойство background роут,
        // на котором была открыта наша модалка
        state={{ background: location }}
        className={styles.link}
      >
            <div className={styles.ingredient_item_content} ref={drag}>
                {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
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


IngredientItem.propTypes = {
    children: ingredientItem
};

export default IngredientItem;