import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { IUser } from '../interfaces/IUser';
import { IWebSocketMessage } from '../interfaces/IWebSocketMessage';


@Injectable()
export class WebsocketService {
  private user: IUser;
  constructor(private store: Store<{ user: IUser }>) {
    store.pipe(select('user')).subscribe((user) => {
      this.user = user;
    });
  }

  private subject: Observable<IWebSocketMessage>;

  public connect(url): Observable<IWebSocketMessage> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url): Observable<IWebSocketMessage> {
    const ws = webSocket({ url });
    return ws as Observable<IWebSocketMessage>;
  }
}
