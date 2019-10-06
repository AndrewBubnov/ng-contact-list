import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { HttpClientModule } from "@angular/common/http";
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FormComponent } from './components/form/form.component';
import { RecordStringComponent } from './components/record-string/record-string.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    FormComponent,
    RecordStringComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
