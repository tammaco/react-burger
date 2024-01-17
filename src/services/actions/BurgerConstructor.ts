import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { getUser } from '../../hooks/useApi'
import { IDragDrop, IIngredientItem, IInitialState, IOrderDetail, IUser, TIngredientItem } from '../../utils/types'

const initialState: IInitialState = {
    bun: null,
    items: [],
    orderDetails: [],
    user: null,
    isAuthChecked: false
};

const token = localStorage.getItem('accessToken') || null;
const result = await getUser();

const burgerConstructor = createSlice({
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
        },
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
        },
        setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
            state.isAuthChecked = action.payload;
        },
        checkUserAuth: (state) => {
            if (token) {
                if (result?.success)
                    state.user = result.user;

                if (state.user === null) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                }
            }
            state.isAuthChecked = true;
        }
    }
})

export const { addBun, addItem, deleteItem, reset, swapItems, setUser, setIsAuthChecked, checkUserAuth } = burgerConstructor.actions;

export const reducer = burgerConstructor.reducer

