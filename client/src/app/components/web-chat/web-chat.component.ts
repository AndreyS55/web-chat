import { Component, ElementRef, ViewChild } from "@angular/core";
import { ConnectionService } from '../../services/connection.service';
import { UserService } from '../../services/user.service';
import { map, tap } from "rxjs";

@Component({
  selector: 'web-chat',
  templateUrl: './web-chat.component.html',
  styleUrls: ['./web-chat.component.scss'],
})
export class WebChatComponent {
  scrollTop: number;
  @ViewChild('chatFeed', { static: false }) chatFeed: ElementRef;
  userList$ = this.connection.users$;
  messageList$ = this.connection.messages$.pipe(
    map((messages) =>
      messages.map((msg) => ({
        ...msg,
        color: this.userService.getUserColor(msg.userId),
      }))
    ),
    tap(() => {
      setTimeout(() => {
        this.scrollTop = this.chatFeed.nativeElement.scrollHeight;
      });
    })
  );

  constructor(
    private connection: ConnectionService,
    private userService: UserService
  ) {}

  sendMessage(text: string): void {
    const message = {
      text,
      userId: this.userService.userId,
      date: new Date(),
    };
    this.connection.addMessage(message);
  }
}
