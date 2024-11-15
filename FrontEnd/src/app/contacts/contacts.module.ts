import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ContactsListComponent } from '../contacts-list/contacts-list.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ContactsRoutingModule } from './contacts-routing.module';

@NgModule({
  declarations: [
    ContactsListComponent,
    ContactFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ContactsRoutingModule,
  ],
})
export class ContactsModule {}
