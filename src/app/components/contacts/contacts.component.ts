import { Component, OnInit } from '@angular/core';
import {Contact} from "../../models/Contact";
import { ContactService } from "../../services/contact-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Array<Contact>;

  constructor(private contactService: ContactService, private snackBar: MatSnackBar) { }

  ngOnInit() {
     this.contactService.getContacts().subscribe(
         contacts => this.contacts = contacts,
            err => this.openSnackBar(err.error)
     )};

  onDeleteContact = (_id) => {
    this.contactService.deleteContact(_id).subscribe(
        contacts => this.contacts = contacts,
            err => this.openSnackBar(err.error)
    )};

  onEditContact = (contact) => {
    this.contactService.editContact(contact).subscribe(
        contacts => this.contacts = contacts,
            err => this.openSnackBar(err.error)
    )};


  onAddContact = (newContact) => {
    this.contactService.addContact(newContact).subscribe(
        contacts => this.contacts = contacts,
            err => this.openSnackBar(err)
    )};

  openSnackBar = (err) => {
    const errorMessage = err.text || err.error || "Something's gone wrong on server. Please try again."
    this.snackBar.open(errorMessage, "Ok",{duration: 5000, panelClass: ['red-snackbar']})
  }

}
