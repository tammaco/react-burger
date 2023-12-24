import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = "https://norma.nomoreparties.space/api";

const setTokens = (refreshToken, accessToken) => {
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("accessToken", accessToken);
}

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const refreshToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkReponse);
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

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = null;
  if (!extraOptions?.needAccessToken)
    result = await baseQuery(args, api, extraOptions);
  else {
    result = await baseQueryWithAccessToken(args, api, extraOptions);
    if (result.error && (result.error.status === 401 || result.error.status === 403)) {
      // try to get a new token
      const refreshResult = await refreshToken();
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
      query: () => '/ingredients',
      transformResponse: (response) => response.data ?? []
    }),
    sendOrder: builder.query({
      query: (arg) => ({
        url: '/orders',
        method: 'POST',
        body: { 'ingredients': arg }
      }),
      extraOptions: { needAccessToken: true }
    }),
    getUser: builder.query({
      query: (arg) => ({
        url: '/auth/user',
        method: 'POST',
        body: arg
      }),
    }),
    updateUser: builder.query({
      query: (arg) => ({
        url: '/auth/user',
        method: 'PATCH',
        body: arg
      }),
      extraOptions: { needAccessToken: true }
    }),
    login: builder.query({
      query: (arg) => ({
        url: '/auth/login',
        method: 'POST',
        body: arg
      }),
    }),
    register: builder.query({
      query: (arg) => ({
        url: '/auth/register',
        method: 'POST',
        body: arg
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        body: { token: localStorage.getItem("refreshToken") }
      })
    }),
    passwordReset: builder.query({
      query: (arg) => ({
        url: '/password-reset',
        method: 'POST',
        body: { "email": arg }
      }),
    }),
    passwordResetReset: builder.query({
      query: (arg) => ({
        url: '/password-reset/reset',
        method: 'POST',
        body: arg
      }),
    }),
    token: builder.query({
      query: () => ({
        url: '/auth/token',
        method: 'POST',
        body: { token: localStorage.getItem("refreshToken") }
      }),
    }),
  }),
});

export const { useGetIngredientsQuery, useSendOrderQuery
  , useLazyUpdateUserQuery
  , useLazyPasswordResetQuery, useLazyPasswordResetResetQuery
  , useLazyLoginQuery, useLazyRegisterQuery, useLazyLogoutQuery } = burgerApi;