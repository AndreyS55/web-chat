import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent {
  @ViewChild('messageInput', { static: false })
  messageInput: ElementRef<HTMLTextAreaElement>;
  @Output() post = new EventEmitter<string>();
  text = '';

  sendMessage() {
    const message = this.text.trim();
    if (message.length > 0) {
      this.post.emit(message);
      this.messageInput.nativeElement.value = '';
    }
  }
}
