import { combineReducers, configureStore, PreloadedState  } from '@reduxjs/toolkit'

import { reducer as burgerReducer } from './slices/burgerSlice';
import { reducer as userReducer } from './slices/userSlice';
import { reducer as orderReducer } from './slices/orderSlice';

import { burgerApi } from '../hooks/useApi'

const rootReducer = combineReducers({
  [burgerApi.reducerPath]: burgerApi.reducer,
  bconstructor: burgerReducer,
  user: userReducer,
  order: orderReducer
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().prepend(burgerApi.middleware),
    preloadedState: preloadedState
  })
}

export type Store = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = Store['dispatch']