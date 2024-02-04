
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IOrderFeedItem, IResponseOrderFeed } from '../../utils/types';

export interface IOrdersInitialState {
    isEstablishingConnection: boolean;
    isConnected: boolean;
    feedOrders: IOrderFeedItem[];
    currentOrder: IOrderFeedItem | null;
  }
   
  const initialState: IOrdersInitialState = {
    isEstablishingConnection: false,
    isConnected: false,
    feedOrders: [],
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
      receiveAllOrders: ((state, action: PayloadAction<IResponseOrderFeed>) => {
        state.feedOrders = action.payload.orders;
      }),

      /*receiveAllMessages: ((state, action: PayloadAction<{
        messages: ChatMessage[]
      }>) => {
        state.messages = action.payload.messages;
      }),
      receiveMessage: ((state, action: PayloadAction<{
        message: ChatMessage
      }>) => {
        state.messages.push(action.payload.message);
      }),*/

     
    },
  });
   
  export const orderActions = orderSlice.actions;
   
  export const reducer = orderSlice.reducer;