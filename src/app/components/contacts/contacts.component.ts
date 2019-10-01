import { Component, OnInit } from '@angular/core';
import {Contact} from "../../models/Contact";
import { ContactService } from "../../services/contact-service.service";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Array<Contact>
  constructor(private contactService: ContactService) { }

  ngOnInit() {
     this.contactService.getContacts().subscribe(contacts => this.contacts = contacts)
  }

  onDeleteContact = (_id) => {
    this.contactService.deleteContact(_id).subscribe(contacts => this.contacts = contacts)
    // this.contacts = this.contacts.filter(item => item._id !== _id)
  }

  onAddContact = (newContact) => {
    this.contactService.addContact(newContact).subscribe(contacts => this.contacts = contacts)
  }

}
