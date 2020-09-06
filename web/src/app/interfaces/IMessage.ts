import { IUser } from './IUser';

export interface IMessage {
    date: string | Date;
    message: string;
    user: IUser;
}