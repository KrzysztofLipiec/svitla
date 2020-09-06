import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { CommunicationService } from 'src/app/services/communication.service';
import { Action } from 'src/app/interfaces/Action';
import { IMessage } from 'src/app/interfaces/IMessage';
import { IUser } from 'src/app/interfaces/IUser';
import { Store, select } from '@ngrx/store';
import { InternalActionsService } from 'src/app/services/internalActions.service';

@Component({
    selector: 'app-sender',
    templateUrl: './sender.component.html',
    styleUrls: ['./sender.component.scss']
})
export class SenderComponent implements OnInit {
    @Input() public message: string = '';
    @ViewChild('messageInput') messageInput: ElementRef;
    private user: IUser;

    constructor(
        private communicationService: CommunicationService,
        private store: Store<{ user: IUser }>,
        private internalActionsService: InternalActionsService
    ) {
        this.store.pipe(select('user')).subscribe((user) => this.user = user);
        this.internalActionsService.userSelection.subscribe((user: IUser) => {
            this.message += `@${user.name} `;
            this.messageInput.nativeElement.focus();
        });
    }

    public sendMessage(): void {
        this.communicationService.actions.next({
            action: Action.sendMessage,
            body: {
                date: new Date(),
                user: this.user,
                message: this.message
            } as unknown as IMessage
        });
        this.message = '';
    }

    ngOnInit(): void {
    }
}