import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentTab: 'bun'
};

const burgerIngredients = createSlice({
  name: "burgerIngredients",
  initialState: initialState,
  reducers: {
    toggleTab: (state, action) => {

    }
  }
});

export const { toggleTab } = burgerIngredients.actions;
export const reducer = burgerIngredients.reducer;