import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesComponent } from './components/messages/messages.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './stores/currentUser.reducer';
import { SenderComponent } from './components/sender/sender.component';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from './services/websocket.service';
import { CommunicationService } from './services/communication.service';
import { usersReducer } from './stores/users.reducer';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    SenderComponent,
    UsersComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    StoreModule.forRoot({ user: userReducer, users: usersReducer }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatListModule
  ],
  providers: [WebsocketService, CommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
