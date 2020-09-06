import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import { Action } from '../../interfaces/Action';
import { IData } from '../../interfaces/IData';
import { IMessage } from '../../interfaces/IMessage';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  private actionHandlers: Map<Action, (body: unknown) => void> = new Map();
  public messages: Array<IMessage> = [];
  public currentUser: Observable<IUser>;

  constructor(
    private communicationService: CommunicationService,
    private store: Store<{ user: IUser }>
  ) {
    this.actionHandlers.set(Action.setData, this.setMessages.bind(this));
    this.actionHandlers.set(Action.receivedMessage, this.addNewMessage.bind(this));

    this.currentUser = store.pipe(select('user'));

    this.communicationService.actions.subscribe(message => {
      if (this.actionHandlers.has(message.action)) {
        this.actionHandlers.get(message.action)(message.body);
      }
    });
  }

  private addNewMessage(data: IMessage): void {
    this.messages.push(data);
  }

  private setMessages(data: IData): void {
    this.messages = data.messages;
  }

  ngOnInit(): void {
  }
}
