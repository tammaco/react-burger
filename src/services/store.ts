import { combineReducers, configureStore, PreloadedState  } from '@reduxjs/toolkit'

import { reducer as burgerConstructor } from './actions/BurgerConstructor';

import { burgerApi } from '../hooks/useApi'

const rootReducer = combineReducers({
  [burgerApi.reducerPath]: burgerApi.reducer,
  bconstructor: burgerConstructor
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().prepend(burgerApi.middleware),
    preloadedState: preloadedState
  })
}

type Store = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = Store['dispatch']