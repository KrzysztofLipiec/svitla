import { Action } from './Action';

export interface IWebSocketMessage {
    action: Action;
    body: unknown;
}