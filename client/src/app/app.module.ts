import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebChatComponent } from './components/web-chat/web-chat.component';
import { ConnectionService } from "./services/connection.service";
import { FormsModule } from "@angular/forms";
import { UserService } from "./services/user.service";
import { MessageComponent } from './components/message/message.component';
import { MessageInputComponent } from './components/message-input/message-input.component';

@NgModule({
  declarations: [AppComponent, WebChatComponent, MessageComponent, MessageInputComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [ConnectionService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
