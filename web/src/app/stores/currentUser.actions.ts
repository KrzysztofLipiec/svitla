import { createAction, props } from '@ngrx/store';
import { IUser } from '../interfaces/IUser';
export const setUser = createAction('[User] Set', props<{ user: IUser }>());
export const resetUser = createAction('[User] Reset User');