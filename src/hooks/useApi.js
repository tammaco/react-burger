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
    getOrder: builder.query({
      query: async (arg) => '',
    })
  }),
});

export const { useGetIngredientsQuery } = burgerApi;