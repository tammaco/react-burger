import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IIngredientItem, IOrderDetails, IResponse, IResponseOrder, IResponseTokens, IResponseUser, IResponseUserApi, IToken, IUser, IUserApi, isErrorWithMessage } from '../utils/types';

import {
  BASE_URL, TOKEN_URL, PASSWORD_RESET_URL, PASSWORD_RESET_RESET_URL, LOG_OUT_URL
  , REGISTER_URL, LOGIN_URL, USER_URL, ORDERS_URL, INGREDIENTS_URL
} from '../utils/constatnts'

const setTokens = (refreshToken: string, accessToken: string) => {
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("accessToken", accessToken);
}

const checkReponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const refreshToken = () => {
  return fetch(`${BASE_URL}${TOKEN_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkReponse);
};

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

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: { needAccessToken?: boolean; }) => {
  let result = null;
  if (!extraOptions?.needAccessToken)
    result = await baseQuery(args, api, extraOptions);
  else {
    result = await baseQueryWithAccessToken(args, api, extraOptions);
    if (result.error && isErrorWithMessage(result.error) && result.error.message === "jwt expired") {
      // try to get a new token
      const refreshResult:IResponseTokens = await refreshToken();
      if (refreshResult.success) {
        // store the new token
        setTokens(refreshResult.refreshToken, refreshResult.accessToken)
        // retry the initial query
        result = await baseQueryWithAccessToken(args, api, extraOptions)
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
    sendOrder: builder.query<IResponseOrder, IOrderDetails>({
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
    })
  }),
});

export const { useGetIngredientsQuery, useSendOrderQuery
  , useLazyUpdateUserQuery
  , useLazyPasswordResetQuery, useLazyPasswordResetResetQuery
  , useLazyLoginQuery, useLazyRegisterQuery, useLazyLogoutQuery } = burgerApi;