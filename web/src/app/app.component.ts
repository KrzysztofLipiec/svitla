import { Component, Input } from '@angular/core';
import { CommunicationService } from './services/communication.service';
import { Action } from './interfaces/Action';
import { Store, select } from '@ngrx/store';
import { IUser } from './interfaces/IUser';
import { setUser } from './stores/currentUser.actions';
import { IData } from './interfaces/IData';
import { IWebSocketMessage } from './interfaces/IWebSocketMessage';
import { InternalActionsService } from './services/internalActions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [InternalActionsService]
})
export class AppComponent {
  public user: IUser;
  @Input() public signName: string;
  constructor(
    private communicationService: CommunicationService,
    private store: Store<{ user: IUser }>
  ) {
    this.store.pipe(select('user')).subscribe((user) => {
      if (user.id && this.user?.id !== user.id) {
        communicationService.actions.next({
          action: Action.registerUser,
          body: user
        });
      }
      this.user = user;
    });

    this.communicationService.actions.subscribe(resp => {
      let message: IWebSocketMessage = resp;
      if (message.action === Action.setData) {
        window.localStorage.setItem('user', JSON.stringify((message.body as IData).currentUser));
        this.store.dispatch(setUser({
          user: (message.body as IData).currentUser
        }));
      }
    });
  }
  public signIn(): void {
    this.communicationService.actions.next({
      action: Action.registerUser,
      body: { name: this.signName }
    });
  }
}
