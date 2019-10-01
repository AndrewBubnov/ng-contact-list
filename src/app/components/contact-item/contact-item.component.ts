import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {Contact} from "../../models/Contact";


@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  @Output() deleteContact = new EventEmitter<string>()
  fields: object = {};
  buttonTitle: string = 'Edit';

  constructor() { }

  ngOnInit() {
    let neededPairs = Object.entries(this.contact).filter(item => item[0] !== 'edited' && item[0] !== '_id')
    this.fields = neededPairs.map(item => item[1])
  }

  onDeleteContact = (_id) => this.deleteContact.emit(_id)
  onClick = () => {
    this.contact.edited = !this.contact.edited;
    this.buttonTitle = this.contact.edited ? 'Save' : 'Edit';
  }

}
