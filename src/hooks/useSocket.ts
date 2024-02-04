import {  IResponseOrderFeed } from "../utils/types";
import { burgerApi } from './useApi';


export const wsApi = burgerApi.injectEndpoints({
    endpoints: builder => ({
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

                    if (result?.message === "Invalid or missing token"){
                        //REFRESH TOKEN!!!
                    }

                    draft.splice(0, draft.length);
                    draft.push(result);
                })
            });

            await cacheEntryRemoved
          } 
          catch {}
        }
      }),
}),
  overrideExisting: false,
});

export const { useGetAllOrdersQuery, useLazyGetProfileOrdersQuery } = wsApi;