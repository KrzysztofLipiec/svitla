import * as WebSocket from 'ws';
import { Action } from '../interfaces/Action';
import { IData } from '../interfaces/IData';
import { IMessage } from '../interfaces/IMessage';
import { IUser } from '../interfaces/IUser';
import { IWebSocketMessage } from '../interfaces/IWebSocketMessage';

export class CommunicationService {
    private handlers: Map<Action, (body: unknown, ws: WebSocket) => void> = new Map();
    private users: Map<string, [IUser, WebSocket]> = new Map();
    private messages: Array<IMessage> = [];

    private createGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    constructor() {
        this.handlers.set(Action.registerUser, this.registerUser.bind(this));
        this.handlers.set(Action.sendMessage, this.onUserMessage.bind(this));
    }

    public initConnection(ws: WebSocket): void {
        ws.on('message', this.onMessage.bind(this, ws));
    }

    private onMessage(ws: WebSocket, request: string): void {
        const msg = JSON.parse(request) as IWebSocketMessage;
        console.log(msg, msg.action);
        if (this.handlers.has(msg.action)) {
            this.handlers.get(msg.action)!(msg.body, ws);
        }
    }

    private onUserMessage(message: IMessage, ws: WebSocket): void {
        message.date = new Date().toString();
        this.messages.push(message);
        this.users.forEach(([user, ws]) => {
            this.sendMessage(ws, {
                action: Action.receivedMessage,
                body: message
            });
        })
    }

    private registerUser(user: IUser, ws: WebSocket): void {
        let selectedUser: IUser = null;
        if (user.id && this.users.has(user.id)) {
            [selectedUser] = this.users.get(user.id);
            this.users.set(user.id, [selectedUser, ws]);
        } else {
            user.id = this.createGUID();
            this.users.set(user.id, [user, ws]);
            selectedUser = user;
            this.sendToOthers(selectedUser, {
                action: Action.addUser,
                body: selectedUser
            });
        }
        this.sendMessage(ws, {
            action: Action.setData,
            body: {
                currentUser: user,
                messages: this.messages,
                users: [...this.users.values()].map(([user]: [IUser, WebSocket]) => user)
            } as IData
        });
    }

    private sendToOthers(selectedUser: IUser, response: IWebSocketMessage): void {
        this.users.forEach(([user, userWs]) => {
            if (user.id !== selectedUser.id) {
                this.sendMessage(userWs, response);
            }
        });
    }

    private sendMessage(ws: WebSocket, message: IWebSocketMessage): void {
        ws.send(JSON.stringify(message));
    }
}