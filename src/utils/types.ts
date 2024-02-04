import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export interface IIngredientItem {
    _id: string,
    type: string,
    name: string,
    price: number,
    calories: number,
    carbohydrates: number,
    fat: number,
    proteins: number,
    image: string,
    image_large: string,
    image_mobile?: string,
    key?: number | undefined
};

export interface IIngredientItemWithQ extends IIngredientItem {
    quantity: number | undefined
};

export type TIngredientItem = Omit<IIngredientItem, "key">

export interface IDragDrop {
    dragIndex: number;
    dropIndex: number 
}

export interface IOrderDetail {
    _id: string,
    quantity: number,
    price: number,
}

export interface IOrderDetails {
    orderItemIds: string[]
}

export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}

export function isErrorWithMessage(
    error: unknown
): error is { message: string } {
    return (
        typeof error === 'object' &&
        error != null &&
        'message' in error &&
        typeof (error as any).message === 'string'
    )
}

export interface IResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface IToken {
    token: string;
}

export interface IUser {
    email?: string;
    name?: string;
    password?: string;
    token?: string;
}

export interface IUserApi {
    user: IUser
}

export interface ITokensApi {
    refreshToken: string;
    accessToken: string;
}

export interface IResponseTokens extends IResponse<null>, ITokensApi {

}

export interface IResponseUserApi extends IResponse<null>, IUserApi, ITokensApi {

}

export interface IResponseUser extends IResponse<null>, IUserApi {

}

export interface IBaseOrder {
    _id: string;
    status: TOrderStatus;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    number: number;
}

interface IOwner {
    name: string
    email: string,
    createdAt: Date,
    updatedAt: Date
}

export interface IOrderList extends IBaseOrder {
    ingredients: ReadonlyArray<IIngredientItem>;
    owner: IOwner;
    price: number;
}

export interface IResponseOrderList extends IResponse<null> {
    name: string;
    order: IOrderList
}

export interface IOrderFeedItem extends IBaseOrder {
    ingredients: string[];
}

export interface IResponseOrderFeed extends IResponse<null> {
    orders: IOrderFeedItem[];
    total: number;
    totalToday: number;
}

export type TOrderStatus = "done" | "pending" | "created" | "canceled";

interface IOrderStatusInfo {
    name: string;
    style: string;
}

export const MOrderStatuses: Map<TOrderStatus, IOrderStatusInfo> = new Map([
    ['done', { name: 'Выполнен', style: 'text_color_inactive'}],
    ['pending', { name: 'Готовится', style: ''}],
    ['created', {name: 'Создан', style: '' }], 
    ['canceled', {name: 'Создан', style: 'canceled' }]
  ]);

  export interface IDictionary<T> {
    [key: string]: T;
   }