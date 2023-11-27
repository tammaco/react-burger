import React from 'react'
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import  Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import { IngredientsContext, TotalCostContext } from '../../services/appContext'

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
    const [isOpenOrderDetails, setIsOpenOrderDetails] = React.useState(false);
    const [orderItems, setOrderItems] = React.useState(null);
    const [orderItemIds, setOrderItemIds] = React.useState(null);
    const [totalCost, totalCostDispatcher] = React.useReducer(reducer, totalCostInitialState);
    
    const itemsLength = 5;

    React.useEffect(
        () => {
            if (ingredients && ingredients.length)
            {
                let randomComponents = [];
                let buns = ingredients.filter(x => x.type === 'bun');
                const randomBunIndex = Math.floor(Math.random() * buns.length);
                const bun = buns[randomBunIndex];
                //булка сверху
                randomComponents.push(bun);

                let items = ingredients.filter(x => x.type !== 'bun');
                const shuffled = items.sort(() => 0.5 - Math.random());
                randomComponents = randomComponents.concat(shuffled.slice(0, itemsLength));

                //булка снизу
                randomComponents.push(bun);

                setOrderItems(randomComponents);
                setOrderItemIds(randomComponents.map(function(item) { return item._id; }));
                const cost = randomComponents.reduce(function (a, b) { return a + parseInt(b.price) }, 0);
                totalCostDispatcher({type: 'set', totalCost: cost});
            }
        },
        [ingredients, setOrderItems, setOrderItemIds]
    );

    const handleClick = () => {      
        setIsOpenOrderDetails(!isOpenOrderDetails);
    };

    return (
        <section className={styles.layout}>
                {
                    orderItems && orderItems.length
                    && (
                            <div className={styles.components}>
                                {orderItems.map((item, index) => {
                                    let isBun = index === 0 || index === itemsLength + 1;
                                    return (
                                        <div key={index} className={isBun ? styles.bun : ''}>
                                            {(!isBun && <DragIcon type="primary" />)}
                                            <ConstructorElement  key={index}
                                                type={index === 0 ? 'top' : index === itemsLength + 1 ? 'bottom' : ''}
                                                isLocked={isBun ? true : false}
                                                text={item.name + (index === 0 ? ' верх' : index === itemsLength + 1 ? ' низ' : '')}
                                                price={item.price}
                                                thumbnail={item.image} />
                                        </div>
                                    )
                                })}
                            </div>
                        )
                }
                <TotalCostContext.Provider value={{ totalCost }}>
                    <div className={styles.order_info}>
                        <div className={styles.price}>
                            <p className="text text_type_digits-default">{totalCost.cost}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <Button htmlType="button" type="primary" size="large" onClick={handleClick}>Оформить заказ</Button>
                    </div>
                </TotalCostContext.Provider>
                {isOpenOrderDetails && orderItemIds &&
                        <Modal onClose={() => setIsOpenOrderDetails(false)}>
                            <OrderDetails>{orderItemIds}</OrderDetails>
                        </Modal>}
        </section>
    )
}

export default BurgerConstructor;