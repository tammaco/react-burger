import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { reducer as burgerIngredients } from '../services/slices/BurgerIngredients';
import { reducer as burgerConstructor } from '../services/slices/BurgerConstructor';

import { burgerApi } from '../hooks/useApi'

const rootReducer = combineReducers({
    [burgerApi.reducerPath]: burgerApi.reducer,
    ingredients: burgerIngredients,
    bconstructor: burgerConstructor
})

export const setupStore = (initialState) => {
    return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(burgerApi.middleware),
      preloadedState: initialState
    })
}