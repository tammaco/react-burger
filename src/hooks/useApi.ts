import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IIngredientItem, IOrderDetails, IResponse, IResponseOrderFeed, IResponseOrderList, IResponseTokens, IResponseUser, IResponseUserApi, IUser, isErrorWithMessage } from '../utils/types';

import {
  BASE_URL, PASSWORD_RESET_URL, PASSWORD_RESET_RESET_URL, LOG_OUT_URL
  , REGISTER_URL, LOGIN_URL, USER_URL, ORDERS_URL, INGREDIENTS_URL, ORDERS_ALL_URL
} from '../utils/constants'

import { refreshToken, setTokens } from '../utils/actions';

export const getUser = () => {
  const token = localStorage.getItem("accessToken");
  if (token)
    return fetch(`${BASE_URL}${USER_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Authorization": token
      }
    }).then(function (res) { return res.ok ? res.json() : null });

  return null;
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json;charset=utf-8");
    return headers;
  }
});

const baseQueryWithAccessToken = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json;charset=utf-8");
    const token = localStorage.getItem("accessToken");
    if (token)
      headers.set("Authorization", token);
    return headers;
  }
});

const baseQueryWithAccessTokenWS = fetchBaseQuery({
  baseUrl: BASE_URL,
  paramsSerializer: () => {
    const searchParams = new URLSearchParams();
    searchParams.append('token', localStorage.getItem("accessToken") ?? '');
    return searchParams.toString();
  }
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: { needAccessToken?: boolean; }) => {
  let result = null;
  if (!extraOptions?.needAccessToken)
    result = await baseQuery(args, api, extraOptions);
  else {
    if (args === ORDERS_URL)
    {
      result = await baseQueryWithAccessTokenWS(args, api, extraOptions);
      if (result.error && isErrorWithMessage(result.error) && result.error.message === "Invalid or missing token") {
        const refreshResult: IResponseTokens = await refreshToken();
        if (refreshResult.success) {
          setTokens(refreshResult.refreshToken, refreshResult.accessToken)
          result = await baseQueryWithAccessTokenWS(args, api, extraOptions)
        }
      }
    }
    else
    {
      result = await baseQueryWithAccessToken(args, api, extraOptions);
      if (result.error && isErrorWithMessage(result.error) && result.error.message === "jwt expired") {
        const refreshResult: IResponseTokens = await refreshToken();
        if (refreshResult.success) {
          setTokens(refreshResult.refreshToken, refreshResult.accessToken)
          result = await baseQueryWithAccessToken(args, api, extraOptions)
        }
      }    
    }
  }
  return result
}

export const burgerApi = createApi({
  reducerPath: 'burgerApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => ({
        url: `${INGREDIENTS_URL}`,
        method: 'GET'
      }),
      transformResponse: (response: IResponse<Array<IIngredientItem>>) => response.data ?? []
    }),
    sendOrder: builder.query<IResponseOrderList, IOrderDetails>({
      query: (arg: IOrderDetails) => ({
        url: `${ORDERS_URL}`,
        method: 'POST',
        body: { 'ingredients': arg.orderItemIds }
      }),
      extraOptions: { needAccessToken: true }
    }),
    updateUser: builder.query<IResponseUser, IUser>({
      query: (arg) => ({
        url: `${USER_URL}`,
        method: 'PATCH',
        body: arg
      }),
      extraOptions: { needAccessToken: true }
    }),
    login: builder.query<IResponseUserApi, IUser>({
      query: (arg: IUser) => ({
        url: `${LOGIN_URL}`,
        method: 'POST',
        body: arg
      })
    }),
    register: builder.query<IResponseUserApi, IUser>({
      query: (arg) => ({
        url: `${REGISTER_URL}`,
        method: 'POST',
        body: arg
      }),
    }),
    logout: builder.query<IResponse<null>, null>({
      query: () => ({
        url: `${LOG_OUT_URL}`,
        method: 'POST',
        body: { token: localStorage.getItem("refreshToken") }
      })
    }),
    passwordReset: builder.query<IResponse<null>, IUser>({
      query: (arg) => ({
        url: `${PASSWORD_RESET_URL}`,
        method: 'POST',
        body: arg
      }),
    }),
    passwordResetReset: builder.query<IResponse<null>, IUser>({
      query: (arg) => ({
        url: `${PASSWORD_RESET_RESET_URL}`,
        method: 'POST',
        body: arg
      }),
    }),
    getProfileOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}`,
        method: 'GET',
      }),
      extraOptions: { needAccessToken: true },
      transformResponse: (response: IResponseOrderFeed) => response.orders ?? []
    }),
    getOrder: builder.query({
      query: (arg: number) => ({
        url: `${ORDERS_URL}/${arg}`,
        method: 'GET',
      }),
      transformResponse: (response: IResponseOrderFeed) => response.success ? response.orders[0] : null
    }),
  }),
});

export const { useGetIngredientsQuery
  , useSendOrderQuery
  , useLazyUpdateUserQuery
  , useLazyPasswordResetQuery, useLazyPasswordResetResetQuery
  , useLazyLoginQuery, useLazyRegisterQuery, useLazyLogoutQuery 
  , useGetProfileOrdersQuery
  , useLazyGetOrderQuery
} = burgerApi;