import {  IResponseOrderFeed, IResponseTokens } from "../utils/types";
import { burgerApi } from '../hooks/useApi';
import { refreshToken, setTokens } from "../utils/actions";
import { ORDERS_URL, SOCKET_BASE_URL } from "../utils/constants";

const refershTokenWS = async () => {
  const refreshResult: IResponseTokens = await refreshToken();
        if (refreshResult.success) {
          setTokens(refreshResult.refreshToken, refreshResult.accessToken);
  }
}

const RECONNECT_PERIOD = 3000;

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
    
                if (data?.message === "Invalid or missing token") {
                  await refershTokenWS().then(() => {
                    let accessToken = localStorage.getItem("accessToken")?.replace("Bearer ", "") || '';
                    ws = new WebSocket(SOCKET_BASE_URL + `${ORDERS_URL}?token=${accessToken}`);
                  });
                }

                updateCachedData((draft) => {
                    Object.assign(draft, data)
                });
              }
    
              ws.addEventListener('message', listener);

              ws.onclose = () => {
                if (ws) {
                  ws.close()
                  setTimeout(() => {
                    ws = new WebSocket(arg);
                  }, RECONNECT_PERIOD)
                }
              }

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