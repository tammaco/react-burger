import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderNumber: null
};

const orderDetails = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderNumber: (state, action) => {
            state.orderNumber = action.payload;
        },
    },
})

export const { setOrderNumber } = orderDetails.actions;

export const reducer = orderDetails.reducer
