import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Contact} from "../../models/Contact";



@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent{
  @Input() contact: Contact;
  @Output() deleteContact = new EventEmitter<string>()
  @Output() editContact = new EventEmitter<object>()
  fields: string[] = ['name', 'mail', 'phone'];
  buttonTitle: string = 'Edit';


  constructor() { }

  onDeleteContact = (_id) => this.deleteContact.emit(_id)

  onClick = () => {
    this.contact.edited = !this.contact.edited;
    if (!this.contact.edited) this.editContact.emit(this.contact);
    this.buttonTitle = this.contact.edited ? 'Save' : 'Edit';
  }

}
