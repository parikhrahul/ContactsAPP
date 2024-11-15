import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnChanges {
  @Input() contact: Contact | null = null;
  @Output() save = new EventEmitter<Contact>();
  @Output() cancel = new EventEmitter<void>();

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contact'] && this.contact) {
      this.contactForm.patchValue(this.contact);
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.save.emit(this.contactForm.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
