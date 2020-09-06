import { IUser } from './IUser';
import { IMessage } from './IMessage';

export interface IData {
    users: Array<IUser>;
    messages: Array<IMessage>;
    currentUser: IUser;
}