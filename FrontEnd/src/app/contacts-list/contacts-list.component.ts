import { Component } from '@angular/core';
import { Modal } from 'bootstrap';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent {

  contacts: Contact[] = [
    { id: 0, firstName: 'Rahul', lastName: 'Parikh', email: 'rahulparikh@gmail.com' },
    { id: 1, firstName: 'Jay', lastName: 'Shah', email: 'jayshah@gmail.com' },
    { id: 2, firstName: 'Kishan', lastName: 'Shah', email: 'kishanshah@gmail.com' }
  ];
  selectedContact: Contact | null = null;
  filteredContacts: Contact[] = [...this.contacts];
  searchText: string = '';
  sortDirection: { [key: string]: boolean } = {};
  currentSortProperty: string = '';  
  nextId: number = this.contacts.length > 0 ? Math.max(...this.contacts.map(c => c.id ?? -1)) + 1 : 0;

  openNewContactForm() {
    this.selectedContact = { id: null, firstName: '', lastName: '', email: '' }; 
  }

  editContact(contact: Contact) {
    this.selectedContact = { ...contact };
    const modalElement = document.getElementById('contactModal') as HTMLElement;
    const modalInstance = Modal.getOrCreateInstance(modalElement); 
    modalInstance.show();
  }

  saveContact(contact: Contact) {
    if (contact.id === null || contact.id === undefined) {     
      contact.id = this.nextId++;
      this.contacts.push(contact);
    }
    else{
    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index > -1) {
      this.contacts[index] = contact;      
    }
  }
  this.selectedContact = null;
  this.filteredContacts = [...this.contacts];
  this.closeModal();
  }

  deleteContact(id: number) {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    this.filteredContacts = [...this.contacts];
  }

  cancelEdit() {
    this.selectedContact = null;
    this.closeModal();
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value.toLowerCase();
    this.filteredContacts = this.contacts.filter(contact =>
      contact.firstName.toLowerCase().includes(this.searchText) ||
      contact.lastName.toLowerCase().includes(this.searchText) ||
      contact.email.toLowerCase().includes(this.searchText)
    );
  }
 
  sortContacts(property: keyof Contact) {
    this.currentSortProperty = property;
    this.sortDirection[property] = !this.sortDirection[property]; 
    const direction = this.sortDirection[property] ? 1 : -1;
  
    this.filteredContacts.sort((a, b) => {
      const aValue = a[property] ?? ''; 
      const bValue = b[property] ?? ''; 
  
      if (aValue < bValue) return -1 * direction;
      if (aValue > bValue) return 1 * direction;
      return 0;
    });
  }

  
  getSortIcon(property: keyof Contact) {
    if (this.currentSortProperty === property) {
      return this.sortDirection[property] ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill';
    }
    return 'bi bi-caret-right-fill'; 
  }

  closeModal() {
    const modalElement = document.getElementById('contactModal') as HTMLElement;
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
      modalInstance.hide();
    }
  }
}
