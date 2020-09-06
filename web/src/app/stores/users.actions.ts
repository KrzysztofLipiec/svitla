import { createAction, props } from '@ngrx/store';
import { IUser } from '../interfaces/IUser';

export const setUsers = createAction('[Users] Set', props<{ users: Array<IUser> }>());
export const addUser = createAction('[Users] Add', props<{ user: IUser }>());
export const removeUser = createAction('[Users] Remove', props<{ id: string }>());
export const clearUsers = createAction('[Users] Clear users');