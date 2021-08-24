import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/Models/client.model';
import { ClientService } from 'src/app/Services/client.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  //sorting
  config: any;
  key: string = 'ClientName';
  reverse: boolean = true;
  clientList: Client[];

  constructor(public clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.GetClients();

    this.config = {
      id: 'paginationUserList',
      itemsPerPage: environment.pageSize,
      currentPage: 1,
      totalItems: this.clientList != undefined ? this.clientList.length : 0
    };
  }

  GetClients() {
    this.clientService.GetClients().subscribe(res => {
      this.clientList = res;

     
      debugger;
    })
  }

  AddEditClient(clientId: number) {
    localStorage.setItem('clientId', clientId.toString());
    this.router.navigate(['/client']);
  }

  SelectClient(client: Client) {
    localStorage.setItem('selectedClientId', client.ClientId.toString());
    localStorage.setItem('selectedClientName', client.ClientName.toString());
    this.router.navigate(['/client-detail']);
  }
  ////////////////////////////////////

  sort(key) {
    if (this.key == key) {
      this.reverse = !this.reverse;
    }
    else {
      this.reverse = false;
    }
    this.key = key;
    if (environment.ShowConsoleLogs) {
      console.log(key);
      console.log(this.reverse);
    }
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
