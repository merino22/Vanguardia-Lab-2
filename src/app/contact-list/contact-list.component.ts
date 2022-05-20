import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Input()
  contactsList: Array<Contact> = [];

  saveEnabled: boolean = false;
  otherEnabled: boolean = false;
  selectedTitle?: string;
  contact: Contact = { name: "", email: "", phone: "", title: ""};
  formHere:FormGroup = new FormGroup({});
  titles = [
    "Sr",
    "Sra",
    "Otro"
  ];

  constructor() { }

  ngOnInit(): void {
    this.formHere = this.buildForm();
  }

  addContact() {
    this.saveEnabled = true;
  }

  deleteContact(contact: Contact) {
    const index = this.contactsList.indexOf(contact, 0);
    if(index > -1) {
      this.contactsList.splice(index, 1);
    }
  }

  buildForm() : FormGroup{
    return new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
      email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      phone: new FormControl("", Validators.required),
      title: new FormControl(Validators.required),
    })
  }

  get formControls(){
    return this.formHere?.controls;
  }

  onSubmit(){
    const contact = this.formHere?.value;

    this.contactsList.push(contact);
    this.saveEnabled = false;
    this.otherEnabled = false;
    this.formHere.reset();
  }

  onChanged(){
    if(this.selectedTitle == 'Otro') {
      this.otherEnabled = true;
    } else {
      this.otherEnabled = false;
    }
  }
}
