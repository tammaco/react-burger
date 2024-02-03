import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getUser } from '../../hooks/useApi'
import { IUser } from '../../utils/types'

interface IUserInitialState {
    user: IUser | null,
    isAuthChecked: boolean
};

const initialState: IUserInitialState = {
    user: null,
    isAuthChecked: false
};

const token = localStorage.getItem('accessToken') || null;
const result = await getUser();

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
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

export const { setUser, setIsAuthChecked, checkUserAuth } = userSlice.actions;

export const reducer = userSlice.reducer