import { useEffect, useState } from "react";
import { IOrderFeedItem, IIngredientItem } from "../../../utils/types";
import styles from './order-card.module.css';
import { OrderCreateAt } from '../OrderCreateAt/order-create-at'
import { OrderTotalCost } from "../OrderTotalCost/order-total-cost";
import { OrderHeader } from "../OrderHeader/order-header";
import { OrderIngredientImg } from "../OrderIngredientImg/order-ingredient-img";
import { useGetIngredientsQuery } from "../../../hooks/useApi";

export function OrderCard({order} : { order: IOrderFeedItem }): React.JSX.Element {
    const VISIBLE_INGREDIENTS_COUNT = 6;
    const { data: ingredients } = useGetIngredientsQuery(null);
    const [totalCost, setTotalCost] = useState(0);
    const [orderIngredients, setOrderIngredients] = useState<IIngredientItem[]>([]);
    const [invisibleCount, setInvisibleCount] = useState(0);

    useEffect(() => {  
        if (ingredients) {
            const filteredItems : IIngredientItem[] = [];
            order.ingredients.forEach(i => {
                filteredItems.push(ingredients.filter(x => x._id == i)[0]);
            });
            
            if (filteredItems && filteredItems.length > 0)
            {
                setOrderIngredients(filteredItems);
                setTotalCost(filteredItems.reduce(function (a, b) { return a + b.price }, 0));
                setInvisibleCount(filteredItems.length - VISIBLE_INGREDIENTS_COUNT);
            }
        }
    }, [order.ingredients, ingredients])

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <p className='text text_type_digits-default'>#{order.number}</p>
                <OrderCreateAt createdAt={order.createdAt}></OrderCreateAt>
            </div>
            <OrderHeader order={order}></OrderHeader>
            <div className={styles.components}>
                <div className={styles.ingredients}>
                    {orderIngredients.slice(0, VISIBLE_INGREDIENTS_COUNT).map((item, index) => 
                        { return <div className={styles.ingredient} key={index}> <OrderIngredientImg item={item} /></div> })}
                    {
                        invisibleCount > 0 && 
                            <div className={`${styles.ingredient} ${styles.illustration}`}>
                                <p className="text text_type_digits-default"> + {invisibleCount}</p>
                            </div>
                    }
                </div>
                <OrderTotalCost totalCost={totalCost}></OrderTotalCost>
            </div>
        </div>
    )
}