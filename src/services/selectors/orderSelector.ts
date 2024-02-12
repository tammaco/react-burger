import { IOrderFeedItem } from "../../utils/types";

export const getCurrentOrder = (store: { orders: { currentOrder: IOrderFeedItem }; }) => store.orders.currentOrder;