import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Lab2';
  filteredContacts: Array<Contact> = [];
  listContacts = [
    {name: 'Carlos Varela', email: 'carlos@gmail.com', phone: '99887766', title: 'Sr'},
    {name: 'Aaron Merino', email: 'aaron@gmail.com', phone: '99775522', title: 'Sr'},
    {name: 'Nicole Rodriguez', email: 'nicole@gmail.com', phone: '88995544', title: 'Sra'},
    {name: 'Napoleon', email: 'napoleon@gmail.com', phone: '99775522', title: 'Mr'},
  ];

  ngOnInit(): void {
    this.filteredContacts = this.listContacts;
  }

  containsNumber(text: string) {
    var num = /\d/;
    if(num.test(text))
    {
      return true;
    }
    return false;
  }

  getSearchType(text: string) {

    if(text.includes('@')) {
      return 1
    } else if(this.containsNumber(text)) {
      return 2
    } else {
      return 3
    }
  }

  filter(text: string) {

    var searchType = 0;

    if(text) {
      searchType = this.getSearchType(text);
      switch(searchType) {
        case 1:
          this.filteredContacts = this.listContacts.filter((contact: Contact) =>
          contact.email.toLowerCase().indexOf(text.toLowerCase()) > -1
          )
          break;
        case 2:
          this.filteredContacts = this.listContacts.filter((contact: Contact) =>
          contact.phone.toLowerCase().indexOf(text.toLowerCase()) > -1
          )
          break;
        case 3:
          this.filteredContacts = this.listContacts.filter((contact: Contact) =>
          contact.name.toLowerCase().indexOf(text.toLowerCase()) > -1
          )
          break;
      }
    } else {
      this.filteredContacts = this.listContacts;
    }
  }
}
