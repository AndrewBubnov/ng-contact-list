import {Component, Output, EventEmitter, Input} from '@angular/core';
import {Contact} from "../../models/Contact";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Input('type') type: string;
  @Input('contact') contact: Contact;
  @Output() deleteContact = new EventEmitter<string>()
  @Output() editContact = new EventEmitter<object>()
  @Output() addContact = new EventEmitter<object>()


  buttonTitle: string = 'Edit';

  constructor() { }

  onAddContact = (form) => {
    if (this.contact.name && this.contact.mail && this.contact.phone){
      const newContact: Contact = {name: this.contact.name, mail: this.contact.mail, phone: this.contact.phone, edited: false};
      this.addContact.emit(newContact);
      form.reset();
    }
  }

  onDeleteContact = (_id) => this.deleteContact.emit(_id)

  onEditContact = () => {
    this.contact.edited = !this.contact.edited;
    if (!this.contact.edited) this.editContact.emit(this.contact);
    this.buttonTitle = this.contact.edited ? 'Save' : 'Edit';
  }

}
