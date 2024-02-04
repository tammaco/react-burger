import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ORDERS_ALL_URL, ORDERS_URL, SOCKET_BASE_URL } from "../utils/constants";
import { refreshToken, setTokens } from "../utils/actions";
import SocketEvent, { IOrderFeedItem, IResponseOrderFeed, IResponseTokens, isErrorWithMessage } from "../utils/types";
import { burgerApi } from './useApi';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { Socket, io } from 'socket.io-client';

const token = localStorage.getItem("accessToken");

const baseQuery = fetchBaseQuery({
    baseUrl: SOCKET_BASE_URL,
    prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json;charset=utf-8");
        return headers;
    }
});

const baseQueryWithAccessToken = fetchBaseQuery({
    baseUrl: token ? `${SOCKET_BASE_URL}?token=${token}` : SOCKET_BASE_URL,
    prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json;charset=utf-8");
        return headers;
    }
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: { needAccessToken?: boolean; }) => {
    let result = null;
    if (!extraOptions?.needAccessToken)
        result = await baseQuery(args, api, extraOptions);
    else {
        result = await baseQueryWithAccessToken(args, api, extraOptions);
        if (result.error && isErrorWithMessage(result.error) && result.error.message === "Invalid or missing token") {
            const refreshResult: IResponseTokens = await refreshToken();
            if (refreshResult.success) {
                setTokens(refreshResult.refreshToken, refreshResult.accessToken);
                result = await baseQueryWithAccessToken(args, api, extraOptions);
            }
        }
    }
    return result
}


function getToken() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        return accessToken.replace("Bearer ", "");
    }
  
    return '';
}

export const wsApi = burgerApi.injectEndpoints({
    endpoints: builder => ({

    /*getAllOrders: builder.query<IResponseOrderFeed, string>({
        queryFn: () => ({ data: {} }),
        async onCacheEntryAdded(arg: string, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) 
        {
          try {
            await cacheDataLoaded;
            const ws = new WebSocket(arg);

            debugger;

            ws.addEventListener('message', (event) => {
                updateCachedData((draft) => {
                  draft = JSON.parse(event.data);
                })
            });

            await cacheEntryRemoved
            //ws.close()
          } 
          catch {}
        },
      }),*/
      getAllOrders: builder.query<IResponseOrderFeed[], string>({
        queryFn: () => ({ data: [] }),
        async onCacheEntryAdded(arg: string, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) 
        {
          try {
            await cacheDataLoaded;
            const ws = new WebSocket(arg);

            ws.addEventListener('message', (event) => {
                updateCachedData((draft) => {
                    var result = JSON.parse(event.data);
                    draft.splice(0, draft.length);
                    draft.push(result);
                })
            });

            await cacheEntryRemoved
          } 
          catch {}
        },
      }),
}),
  overrideExisting: false,
});

export const { useGetAllOrdersQuery, useLazyGetProfileOrdersQuery } = wsApi;