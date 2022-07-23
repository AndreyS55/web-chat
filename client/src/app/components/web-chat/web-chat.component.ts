import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'web-chat',
  templateUrl: './web-chat.component.html',
  styleUrls: ['./web-chat.component.scss'],
})
export class WebChatComponent implements OnInit {
  userList$ = this.connection.users$;
  messageList$ = this.connection.messages$;
  message = '';

  constructor(
    private connection: ConnectionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  sendMessage(): void {
    const message = {
      text: this.message,
      userId: this.userService.userId,
      date: new Date(),
    };
    this.connection.addMessage(message);
    this.message = '';
  }
}
