import React from 'react'
import styles from './BurgerIngredients.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

function IngredientItem(props) {
    return (
            <div className={styles.ingredient_item_content}>
                <Counter count={1} size="default" extraClass="m-1" />
                <img src={props.data.image} alt={props.data.name}></img>
                <div className={styles.ingredient_item_price}>
                    <p className="text text_type_digits-default">{props.data.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={styles.ingredient_item_name}>
                    <p className="text text_type_main-small" style={{textAlign: 'center'}}>{props.data.name}</p>
                </div>
            </div>
    )
}

export default IngredientItem;