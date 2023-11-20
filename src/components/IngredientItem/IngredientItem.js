import React from 'react'
import styles from './IngredientItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

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
                    <p className="text text_type_main-small">{props.data.name}</p>
                </div>
            </div>
    )
}


IngredientItem.propTypes = {
    data: PropTypes.shape({
        type: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number
      })
};

export default IngredientItem;