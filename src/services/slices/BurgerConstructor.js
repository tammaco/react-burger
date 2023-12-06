import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    bun: null,
    items: [],
    orderDetails: []
};

const burgerConstructor = createSlice({
    name: 'bconstructor',
    initialState,
    reducers: {
        addBun: {
            reducer: (state, action) => {
                const item = action.payload;
                if (state.bun)
                    state.orderDetails = state.orderDetails.filter((x) => x._id !== state.bun._id);

                state.bun = item;
                state.orderDetails.push({ _id: item._id, quantity: 2, price: item.price });
            },
            prepare: (item) => {
                return { payload: { ...item, key: nanoid() } };
            }
        },
        addItem: {
            reducer: (state, action) => {
                const item = action.payload;
                state.items.push(item);

                const existingItem = state.orderDetails.find(x => x._id === item._id);
                if (existingItem)
                    state.orderDetails.splice(state.orderDetails.indexOf(existingItem), 1, { _id: item._id, quantity: existingItem.quantity + 1, price: item.price });
                else
                    state.orderDetails.push({ _id: item._id, quantity: 1, price: item.price });
            },
            prepare: (item) => {
                return { payload: { ...item, key: nanoid() } };
            }
        },
        deleteItem: (state, action) => {
            const item = action.payload;
            state.items = state.items.filter((x) => x.key !== item.key);
            state.orderDetails = state.orderDetails.filter((x) => x._id !== item._id);
        },
        reset: () => initialState
    },
})

export const getConstructorItems = store => store.bconstructor.items;
export const getBun = store => store.bconstructor.bun;
export const getTotalCost = store => store.bconstructor.orderDetails.reduce(function (a, b) { return a + parseInt(b.price) * b.quantity }, 0);
export const getOrderDetails = store => store.bconstructor.orderDetails;

export const { addBun, addItem, deleteItem, reset } = burgerConstructor.actions;

export const reducer = burgerConstructor.reducer

