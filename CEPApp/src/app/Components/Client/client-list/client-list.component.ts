import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/Models/client.model';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clientList: Client[];
  constructor(public clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.GetClients();
  }

  GetClients() {
    this.clientService.GetClients().subscribe(res => {
      this.clientList = res;
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
}
