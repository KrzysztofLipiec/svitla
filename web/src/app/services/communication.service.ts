import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { IWebSocketMessage } from '../interfaces/IWebSocketMessage';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CommunicationService {
    public actions: Subject<IWebSocketMessage>;
    private SERVER_WS_URL = 'ws://localhost:8999/';

    constructor(wsService: WebsocketService) {
        this.actions = <Subject<IWebSocketMessage>>wsService.connect(this.SERVER_WS_URL);
    }
}