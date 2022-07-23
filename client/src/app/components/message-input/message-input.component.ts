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

  sendMessage(text: string) {
    if (text.length > 0) {
      this.post.emit(text);
      this.messageInput.nativeElement.value = '';
    }
  }
}
