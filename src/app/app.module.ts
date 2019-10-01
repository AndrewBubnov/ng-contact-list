import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { HttpClientModule } from "@angular/common/http";
import { AddContactComponent } from './components/add-contact/add-contact.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactItemComponent,
    AddContactComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
