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

export interface IDragObject {
    index: number;
}

export interface IOrderDetail {
    _id: string,
    quantity: number,
    price: number,
}

export interface IInitialState {
    bun: IIngredientItem | null,
    items: IIngredientItem[] | [],
    orderDetails: IOrderDetail[] | [],
    user: null,
    isAuthChecked: boolean
};

export interface IOrderDetails {
    orderItemIds: string[]
}

export type TMoveItemFunction = (dragIndex: number | undefined, dropIndex: number | undefined) => void;

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
    name?: string;
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

interface IOwner {
    name: string
    email: string,
    createdAt: Date,
    updatedAt: Date
}

export interface IOrder {
    ingredients: ReadonlyArray<IIngredientItem>;
    _id: string;
    owner: IOwner;
    status: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    number: number;
    price: number;
}

export interface IResponseTokens extends IResponse<null>, ITokensApi {

}

export interface IResponseUserApi extends IResponse<null>, IUserApi, ITokensApi {

}

export interface IResponseUser extends IResponse<null>, IUserApi {

}

export interface IResponseOrder extends IResponse<null> {
    order: IOrder
}