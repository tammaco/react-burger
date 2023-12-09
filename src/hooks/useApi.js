import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = "https://norma.nomoreparties.space/api";


export const burgerApi = createApi({
  reducerPath: 'burgerApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: (arg) => '/ingredients',
      transformResponse: (response) => response.data ?? []
    }),
    sendOrder: builder.query({
      query: (arg) => ({
        url: '/orders',
        method: 'POST',
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json;charset=utf-8")
            return headers;
        },
        body: { 'ingredients': arg}
      }),
    })
  }),
});

export const { useGetIngredientsQuery, useSendOrderQuery } = burgerApi;