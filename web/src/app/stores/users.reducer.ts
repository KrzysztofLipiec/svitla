import { createReducer, on } from "@ngrx/store";
import { addUser, clearUsers, removeUser, setUsers } from './users.actions';

const _usersReducer = createReducer(
    [],
    on(clearUsers, (state) => ([])),
    on(setUsers, (state, { users }) => (users)),
    on(addUser, (state, { user }) => {
        return state.concat([user]);
    }),
    on(removeUser, (state, { id }) => {
        let index = state.findIndex((user) => {
            return user.id === id;
        });
        if (index >= 0) {
            state.splice(index, 1);
        }
        return state;
    })
);

export function usersReducer(state, action) {
    return _usersReducer(state, action);
}