import { useEffect, useState } from "react";
import { useGetIngredientsQuery, useLazyGetOrderQuery } from "../../../hooks/useApi";
import { OrderCreateAt } from "../OrderCreateAt/order-create-at";
import { OrderHeader } from "../OrderHeader/order-header";
import { OrderTotalCost } from "../OrderTotalCost/order-total-cost";
import styles from './order-info.module.css';
import { IIngredientItemWithQ, IOrderFeedItem } from "../../../utils/types";
import { useLocation, useParams } from "react-router-dom";
import { OrderIngredientImg } from "../OrderIngredientImg/order-ingredient-img";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function OrderInfo(): React.JSX.Element {
    const [order, setOrder] = useState<IOrderFeedItem>();
    const [orderIngredients, setOrderIngredients] = useState<Set<IIngredientItemWithQ>>();
    const { data: ingredients } = useGetIngredientsQuery(null);
    const [totalCost, setTotalCost] = useState(0);

    const location = useLocation();
    const background = location.state && location.state.background;
    
    const [trigger, { data }] = useLazyGetOrderQuery();
    const { number } = useParams();
    const orderNumber: number = Number(number);
    
    useEffect(() => {  
        trigger(orderNumber);
        if (data) {
            setOrder(data);
            if (ingredients) {
                const filteredItems = ingredients.filter(x => data.ingredients.indexOf(x._id) > -1);
                if (filteredItems && filteredItems.length > 0)
                {
                    let itemSet = new Set<IIngredientItemWithQ>;
                    filteredItems.map(item => {
                        itemSet.add({ ...item, quantity: data.ingredients.filter(x => x === item._id).length});
                    });
                    setOrderIngredients(itemSet);
                    setTotalCost( Array.from(itemSet).reduce(function (a, b) { return a + b.price * (b.quantity || 0) }, 0));
                }
            }
        }
    }, [orderNumber, data]);
    
    return (
        <>
        { order != undefined &&
            <div className={styles.layout}>
                { !background && (<div className={styles.order_number}><p className="text text_type_digits-default"># {number}</p></div> ) }

                <OrderHeader order={order}></OrderHeader>

                <div className={styles.ingredients}>
                    <p className="text text_type_main-medium">Состав:</p>
                    <div className={styles.ingredients_items}>
                    {
                        orderIngredients && Array.from(orderIngredients).map((item, index) => 
                            { 
                                return (
                                    <div className={styles.ingredients_item} key={index}> 
                                        <OrderIngredientImg item={item} />
                                        <p className="text text_type_main-small ml-3">{item.name}</p>
                                        <div className={styles.ingredients_item_total}>
                                            <p className="text text_type_digits-default">{item.quantity}</p>
                                            &nbsp;<p className="text text_type_main-small">x</p>
                                            &nbsp;<p className="text text_type_digits-default">{item.price}</p>
                                            &nbsp;<CurrencyIcon type="primary" />
                                        </div>
                                    </div> 
                                )
                            }
                        )
                    } 
                    </div>
                </div>

                <div className={styles.footer}>
                    <OrderCreateAt createdAt={order.createdAt}></OrderCreateAt>
                    <OrderTotalCost totalCost={totalCost}></OrderTotalCost>
                </div>
            </div>
        }
        </>
    )
}