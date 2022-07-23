import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageInputComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
