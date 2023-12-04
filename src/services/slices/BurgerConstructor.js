import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bun: null,
    items: []
};

const burgerConstructor = createSlice({
    name: 'bconstructor',
    initialState,
    reducers: {
        addBun: {
                reducer: (state, action) => {
                    state.bun = action.payload;
                },
                prepare: (item) => {
                    const id = Math.random();
                    return { payload: { ...item, key: id } };
                }
        },
        deleteBun(state) {
            state.bun = null;
        },
        addItem(state, action) {
            state.items.push(action.payload);
        },
        deleteItem: (state, action) => {
            state.items = state.items.filter((item) => item.key !== action.payload);
        },
    },  
})

export const getConstructorItems = store => store.bconstructor.items;
  
export const { addBun, deleteBun, addItem, deleteItem } = burgerConstructor.actions;

export const reducer = burgerConstructor.reducer

