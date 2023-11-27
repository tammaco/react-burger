import React from 'react'
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import  { useModal } from '../../hooks/useModal'
import  Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import { IngredientsContext, TotalCostContext } from '../../services/appContext'
import ConstructorItem from '../ConstructorItem/ConstructorItem'

const totalCostInitialState = { cost: null }; 

function reducer(state, action) {
  switch (action.type) {
    case "set":
      return { cost: action.totalCost };
    case "reset":
      return totalCostInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function BurgerConstructor(props) {

    const ingredients = React.useContext(IngredientsContext);
    const [bun, setBun] = React.useState(null);
    const [orderItems, setOrderItems] = React.useState(null);
    const [orderItemIds, setOrderItemIds] = React.useState(null);
    const [totalCost, totalCostDispatcher] = React.useReducer(reducer, totalCostInitialState);

    const { isModalOpen, openModal, closeModal } = useModal();

    const itemsLength = 5;

    React.useEffect(
        () => {
            if (ingredients && ingredients.length)
            {
                let buns = ingredients.filter(x => x.type === 'bun');
                const randomBunIndex = Math.floor(Math.random() * buns.length);
                setBun(buns[randomBunIndex]);

                let items = ingredients.filter(x => x.type !== 'bun');
                const shuffled = items.sort(() => 0.5 - Math.random()).slice(0, itemsLength);


                setOrderItems(shuffled);
                setOrderItemIds(shuffled.map(function(item) { return item._id; }));
                const cost = shuffled.reduce(function (a, b) { return a + parseInt(b.price) }, 0);
                totalCostDispatcher({type: 'set', totalCost: cost});
            }
        },
        [ingredients, setBun, setOrderItems, setOrderItemIds]
    );

    return (
        <section className={styles.layout}>
                {
                    orderItems && orderItems.length
                    && (
                        <>
                            <div className={styles.bun}>
                                <ConstructorElement type='top' isLocked={true} text={bun.name + ' (верх)'} price={bun.price} thumbnail={bun.image} />
                            </div>
                            <div className={styles.components}>
                                {orderItems.map((item, index) => (<div key={index}><ConstructorItem item={item}></ConstructorItem></div>)) }
                            </div>
                            <div className={styles.bun}>
                                <ConstructorElement type='bottom' isLocked={true} text={bun.name + ' (низ)'} price={bun.price} thumbnail={bun.image} />
                            </div>
                        </>
                        )
                }
                <TotalCostContext.Provider value={{ totalCost }}>
                    <div className={styles.order_info}>
                        <div className={styles.price}>
                            <p className="text text_type_digits-default">{totalCost.cost}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <Button htmlType="button" type="primary" size="large" onClick={openModal}>Оформить заказ</Button>
                    </div>
                </TotalCostContext.Provider>
                {isModalOpen && orderItemIds &&
                        <Modal onClose={closeModal}>
                            <OrderDetails orderItemIds={orderItemIds} />
                        </Modal>}
        </section>
    )
}

export default BurgerConstructor;