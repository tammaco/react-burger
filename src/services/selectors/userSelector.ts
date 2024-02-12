import { IUser } from "../../utils/types";

export const getUser = (store: { user: { user: IUser | null; }; }) => store.user.user;
export const getIsAuthChecked = (store: { user: { isAuthChecked: boolean; }; }) => store.user.isAuthChecked;