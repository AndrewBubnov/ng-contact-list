import {Component, EventEmitter, Output } from '@angular/core';
import {Contact} from "../../models/Contact";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {

  name: string = '';
  mail: string = '';
  phone: string | number = '';


  @Output() addContact = new EventEmitter<object>();

  constructor() { }


  onAddContact = (form) => {
    if (this.name && this.mail && this.phone){
      const newContact: Contact = {name: this.name, mail: this.mail, phone: this.phone, edited: false};
      this.addContact.emit(newContact);
      form.reset();
    }
  }

}
