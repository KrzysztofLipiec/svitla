import { createReducer, on } from "@ngrx/store";
import { IUser } from '../interfaces/IUser';
import { setUser, resetUser } from './currentUser.actions';

const noUserState: IUser = ((): IUser => {
    const userStorage = window.localStorage.getItem('user');
    let currentUser = null;
    if (userStorage) {
        currentUser = JSON.parse(userStorage);
    }
    return currentUser;
})() || {
    id: null,
    name: ''
}

const _userReducer = createReducer(
    noUserState,
    on(setUser, (state, { user }) => {
        return ({ id: user.id, name: user.name })
    }),
    on(resetUser, () => noUserState)
)

export function userReducer(state, action) {
    return _userReducer(state, action);
}