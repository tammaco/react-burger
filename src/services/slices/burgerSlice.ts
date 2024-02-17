import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { IDictionary, IDragDrop, IIngredientItem, IOrderDetail, TIngredientItem } from '../../utils/types'

interface IConstructorInitialState {
    ingredients: IDictionary<IIngredientItem>[],
    bun: IIngredientItem | null,
    items: IIngredientItem[] | [],
    orderDetails: IOrderDetail[]
};

const initialState: IConstructorInitialState = {
    ingredients: [],
    bun: null,
    items: [],
    orderDetails: []
};

const burgerSlice = createSlice({
    name: 'bconstructor',
    initialState,
    reducers: {
        addBun: {
            reducer: (state, action: PayloadAction<TIngredientItem>) => {
                const item = action.payload;
                if (state && state.bun)
                    state.orderDetails.filter((x) => x._id !== state.bun?._id);

                state.bun = item;
                const bunItem: IOrderDetail = { _id: item._id, quantity: 2, price: item.price };
                state.orderDetails = [...state.orderDetails, bunItem];
            },
            prepare: (item: TIngredientItem) => {
                return { payload: { ...item, key: nanoid() } };
            }
        },
        addItem: {
            reducer: (state, action: PayloadAction<TIngredientItem>) => {
                const item = action.payload;
                state.items = [...state.items, item];

                const existingItem = state.orderDetails.find(x => x._id === item._id);
                if (existingItem) {
                    const ind = state.orderDetails.findIndex(x => x._id === item._id);
                    state.orderDetails.splice(ind, 1, { _id: item._id, quantity: existingItem.quantity + 1, price: item.price });
                }
                else
                    state.orderDetails = [...state.orderDetails, { _id: item._id, quantity: 1, price: item.price }];
            },
            prepare: (item: IIngredientItem) => {
                return { payload: { ...item, key: nanoid() } };
            }
        },
        deleteItem: (state, action: PayloadAction<IIngredientItem>) => {
            const item = action.payload;
            state.items = state.items.filter((x) => x.key !== item.key);
            state.orderDetails = state.orderDetails.filter((x) => x._id !== item._id);
        },
        reset: (state) => {
            state.bun = null;
            state.items = [];
            state.orderDetails = [];
        },
        swapItems: (state, action: PayloadAction<IDragDrop>) => {
            const dragIndex = action.payload.dragIndex;
            const dropIndex = action.payload.dropIndex;

            state.items[dropIndex] = state.items.splice(dragIndex, 1, state.items[dropIndex])[0];
        }
    }
})

export const { addBun, addItem, deleteItem, reset, swapItems } = burgerSlice.actions;

export const reducer = burgerSlice.reducer