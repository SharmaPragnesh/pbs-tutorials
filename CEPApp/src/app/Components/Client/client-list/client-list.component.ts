import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Models/client.model';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clientList: Client[];
  constructor(public clientService: ClientService) { }

  ngOnInit(): void {
    this.GetClients();
  }

  GetClients() {
    this.clientService.GetClients().subscribe(res => {
      // console.log(res);
      this.clientList = res;
    })
  }
}
