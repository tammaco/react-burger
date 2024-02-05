import {  IResponseOrderFeed, IResponseTokens } from "../utils/types";
import { burgerApi } from '../hooks/useApi';
import { createEntityAdapter } from "@reduxjs/toolkit";
import { refreshToken, setTokens } from "../utils/actions";
import { ORDERS_URL, SOCKET_BASE_URL } from "../utils/constants";

const responseOrderAdapter = createEntityAdapter<IResponseOrderFeed>();

const refershTokenWS = async () => {
  const refreshResult: IResponseTokens = await refreshToken();
        if (refreshResult.success) {
          setTokens(refreshResult.refreshToken, refreshResult.accessToken);
  }
}

export const wsApi = burgerApi.injectEndpoints({
    endpoints: builder => ({
      getAllOrders: builder.query<IResponseOrderFeed | {}, string>({
        queryFn: () => ({ data: {} }),
        async onCacheEntryAdded(arg: string, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) 
        {
            let ws = new WebSocket(arg);

            try {
              await cacheDataLoaded
    
              const listener = async (event: MessageEvent) => {
                const data = JSON.parse(event.data);
    
                if (data?.message === "Invalid or missing token"){
                  //REFRESH TOKEN!!!
                  await refershTokenWS().then(() => {
                    let accessToken = localStorage.getItem("accessToken")?.replace("Bearer ", "") || '';
                    ws = new WebSocket(SOCKET_BASE_URL + `${ORDERS_URL}?token=${accessToken}`);
                  });
                }

                updateCachedData((draft) => {
                    //responseOrderAdapter.setOne(draft, data)
                    Object.assign(draft, data)
                });
              }
    
              ws.addEventListener('message', listener)
            } catch {
              ws.close();
            }

            await cacheEntryRemoved;
        }
      }),
}),
  overrideExisting: false,
});

export const { useGetAllOrdersQuery } = wsApi;