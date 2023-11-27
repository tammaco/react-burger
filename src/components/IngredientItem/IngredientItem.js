import React from 'react'
import styles from './IngredientItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientItem } from '../../utils/types'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import  Modal from '../Modal/Modal'
import  { useModal } from '../../hooks/useModal'

function IngredientItem(props) {
    const item = props.children;
    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <>
            <div className={styles.ingredient_item_content} onClick={openModal}>
                <Counter count={1} size="default" extraClass="m-1" />
                <img src={item.image} alt={item.name}></img>
                <div className={styles.ingredient_item_price}>
                    <p className="text text_type_digits-default">{item.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={styles.ingredient_item_name}>
                    <p className="text text_type_main-small">{item.name}</p>
                </div>
            </div>
            {isModalOpen && 
                    <Modal onClose={closeModal} header='Детали ингредиента'>
                        <IngredientDetails>{item}</IngredientDetails>
                    </Modal>
                }
        </>
    )
}


IngredientItem.propTypes = {
    children: ingredientItem
};

export default IngredientItem;