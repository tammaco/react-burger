
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IOrderFeedItem, IResponseOrderFeed } from '../../utils/types';

export interface IOrdersInitialState {
    isEstablishingConnection: boolean;
    isConnected: boolean;
    orders: IOrderFeedItem[];
    currentOrder: IOrderFeedItem | null;
  }
   
  const initialState: IOrdersInitialState = {
    isEstablishingConnection: false,
    isConnected: false,
    orders: [],
    currentOrder: null
  };
   
  const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
      startConnecting: (state => {
        state.isEstablishingConnection = true;
      }),
      connectionEstablished: (state => {
        state.isConnected = true;
        state.isEstablishingConnection = true;
      }),
      receiveAllOrders: ((state, action) => {
        state.orders = action.payload.orders;
      }),
      //
      setCurrentOrder: (state, action: PayloadAction<IOrderFeedItem>) => {
          state.currentOrder = action.payload;
      },
    },
  });
   
  export const { setCurrentOrder } = orderSlice.actions;
   
  export const reducer = orderSlice.reducer;