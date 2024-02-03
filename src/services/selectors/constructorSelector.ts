import { IIngredientItem, IOrderDetail } from "../../utils/types";

export const getConstructorItems = (store: { bconstructor: { items: [IIngredientItem]; }; }) => store.bconstructor.items;
export const getBun = (store: { bconstructor: { bun: IIngredientItem; }; }) => store.bconstructor.bun;
export const getTotalCost = (store: { bconstructor: { orderDetails: IOrderDetail[] }; }) => 
    store.bconstructor.orderDetails.reduce(function (a: number, b: IOrderDetail) { return a + b.price * b.quantity }, 0);
export const getOrderDetails = (store: { bconstructor: { orderDetails: IOrderDetail[] | []; }; }) => store.bconstructor.orderDetails;

