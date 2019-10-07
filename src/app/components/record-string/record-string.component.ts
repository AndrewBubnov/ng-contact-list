import { Component, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-record-string',
  templateUrl: './record-string.component.html',
  styleUrls: ['./record-string.component.css'],
  animations: [
    trigger(
        'showUp',
        [
          transition(
              ':enter', [
                style({opacity: 0}),
                animate('200ms', style({opacity: 1}))
              ]
          )
        ])
  ]
})
export class RecordStringComponent {
  @Input('data') data: string;
  private state: string;
}
