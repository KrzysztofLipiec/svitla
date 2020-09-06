import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable()
export class InternalActionsService {
    private userSelectionSource = new Subject<IUser>();

    public userSelection = this.userSelectionSource.asObservable();

    public selectUser(user: IUser): void {
        this.userSelectionSource.next(user);
    }
}