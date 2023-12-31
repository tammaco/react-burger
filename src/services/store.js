import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { reducer as burgerConstructor } from './actions/BurgerConstructor';

import { burgerApi } from '../hooks/useApi'

const rootReducer = combineReducers({
  [burgerApi.reducerPath]: burgerApi.reducer,
  bconstructor: burgerConstructor
})

export const setupStore = (initialState) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(burgerApi.middleware),
    preloadedState: initialState
  })
}