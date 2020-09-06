import express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { CommunicationService } from './services/communication.service';

const app = express(),
    server = http.createServer(app),
    wss = new WebSocket.Server({ server }),
    communicationService = new CommunicationService();

wss.on('connection', (ws: WebSocket) => {
    communicationService.initConnection(ws)
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address()} :)`);
});