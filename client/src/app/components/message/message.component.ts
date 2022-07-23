import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColoredMessage } from '../../types';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  @Input() message: ColoredMessage;
  userId = this.userService.userId;

  constructor(private userService: UserService) {}
}
