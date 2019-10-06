import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Contact } from "../models/Contact";
import { Id } from "../models/Id";
import { HttpClient, HttpHeaders } from "@angular/common/http";



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactsUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getContacts(): Observable <Contact[]> {
    return this.http.get<Contact[]>(`${this.contactsUrl}/contacts`)
  }

  addContact(contact: Contact) {
    return this.http.post<Contact>(`${this.contactsUrl}/contact/add`, contact, httpOptions)
  }

  deleteContact(_id: string) {
    return this.http.delete<Id>(`${this.contactsUrl}/contact/delete/${_id}`, httpOptions)
  }

  editContact(contact: Contact){
    return this.http.put<Contact>(`${this.contactsUrl}/contact/edit`, contact, httpOptions)
  }
}
