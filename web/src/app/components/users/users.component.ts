import { Component, Input, OnDestroy } from "@angular/core";
import { select, Store } from '@ngrx/store';
import { Action } from '../../interfaces/Action';
import { IUser } from 'src/app/interfaces/IUser';
import { CommunicationService } from 'src/app/services/communication.service';
import { IData } from 'src/app/interfaces/IData';
import { addUser, removeUser, setUsers } from 'src/app/stores/users.actions';
import { Subscription } from 'rxjs';
import { InternalActionsService } from 'src/app/services/internalActions.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy {
    public users: IUser[];
    private actionHandlers: Map<Action, (body: unknown) => void> = new Map();
    private subscriptions: Array<Subscription> = [];

    constructor(
        private communicationService: CommunicationService,
        private store: Store<{ users: IUser[] }>,
        private internalActionService: InternalActionsService
    ) {
        this.actionHandlers.set(Action.addUser, this.addUser.bind(this));
        this.actionHandlers.set(Action.setUsers, this.setUsers.bind(this));
        this.actionHandlers.set(Action.removeUser, this.removeUser.bind(this));
        this.actionHandlers.set(Action.setData, (data: IData) => this.setUsers(data.users));

        this.subscriptions.push(this.communicationService.actions.subscribe(message => {
            if (this.actionHandlers.has(message.action)) {
                this.actionHandlers.get(message.action)(message.body);
            }
        }));
        store.pipe(select('users')).subscribe((users: IUser[]) => {
            this.users = users;
        });
    }

    private setUsers(users: IUser[]): void {
        this.store.dispatch(setUsers({ users }));
    }

    private markUser(user: IUser): void {
        this.internalActionService.selectUser(user);
    }

    private addUser(user: IUser): void {
        this.store.dispatch(addUser({ user }));
    }

    private removeUser(id: string): void {
        this.store.dispatch(removeUser({ id }));
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        })
    }
}