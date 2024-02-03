import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ORDERS_URL, SOCKET_BASE_URL } from "../utils/constants";
import { refreshToken, setTokens } from "../utils/actions";
import { IOrderFeedItem, IResponseOrderFeed, IResponseTokens, isErrorWithMessage } from "../utils/types";
import { burgerApi } from './useApi';

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
/*
export const wsApi = burgerApi.injectEndpoints({
    endpoints: builder => ({
        getAllOrders: builder.query<IOrderFeedItem[], void>({
            query: () => '/orders?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODU1NmE4ODc4OTljMDAxYjgyNGFmZiIsImlhdCI6MTcwNjg4MDc4MSwiZXhwIjoxNzA2ODgxOTgxfQ.ZtLqSmIgIrAibQ4EDd13ZqcrrO46k35Zi8maRwkS6zk',
      async onCacheEntryAdded(arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded; 
          const socket = io(SOCKET_BASE_URL);

          socket.on('connect', () => {
            socket.emit('request_all_messages');
          });
 
          socket.on('receive_message', (data: IOrderFeedItem) => {
            updateCachedData((draft) => {
                draft.push(data)
              })
          });
 
          await cacheEntryRemoved;

          socket.off('connect');
          socket.off('request_all_messages');
        } catch {
        }
      },
        }),
    }),
    overrideExisting: false,
});

export const { useGetAllOrdersQuery } = wsApi;
*/