import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-record-string',
  templateUrl: './record-string.component.html',
  styleUrls: ['./record-string.component.css'],
  animations: [
    trigger('changeState', [
      state('start', style({opacity: 0})),
      state('finish', style({opacity: 1})),
      transition('start <=> finish', [animate('200ms')])
    ]),
  ]
})
export class RecordStringComponent implements OnInit, OnDestroy{
  @Input('data') data: string;
  private state: string;
  constructor() { }

  ngOnInit(): void {
    this.state = 'start';
    setTimeout(() => this.state = 'finish', )
  }

  ngOnDestroy(): void {
    this.state = 'start';
  }


}
