import { IUser } from './IUser';

export interface IMessage {
    date: string;
    message: string;
    user: IUser;
}