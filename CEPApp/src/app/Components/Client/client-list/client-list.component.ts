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

  //
  p: number = 1;
  totalItems: any;
  //sorting
  config: any;
  key: string = 'ClientName';
  reverse: boolean = false;
  clientList: Client[];
  /////////////////

  constructor(public clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.clientService.GetFormModel();
    this.p = this.clientService.clientParameter.PageStart;
    // this.clientService.clientParameter.PageStart = 1;
    this.GetClients();
  }

  GetClients() {
    this.clientService.GetClientsSearch().subscribe(res => {
      console.log(res);
      this.clientList = res["List"];
      this.totalItems = res["TotalCount"];

      // this.config = {
      //   id: 'paginationUserList',
      //   itemsPerPage: environment.pageSize,
      //   currentPage: 1,
      //   totalItems: this.totalItems
      // };
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

    this.clientService.clientParameter.SortOrder = this.reverse;
    this.clientService.clientParameter.SortColumn = key;

    if (environment.ShowConsoleLogs) {
      console.log(key);
      console.log(this.reverse);
    }
    //////////////////////////////////


    this.p = 1;
    this.clientService.clientParameter.PageStart = this.p;
    this.GetClients();
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  getPage(page) {
    this.p = page;
    this.clientService.clientParameter.PageStart = this.p;
    this.GetClients();
  }

  onStatusChange(status: any) {
    if (status.target.value != "") {
      this.clientService.clientParameter.Status = Number(status.target.value);
    }
    this.GetClients();
  }

  ConvertToId(obj: any) {
    var id = 0;

    if (obj.target.value.split(":").length >= 2) {
      id = Number(obj.target.value.split(":")[1].trim());
    } else if (obj.target.value.split(":").length >= 1) {
      id = Number(obj.target.value);
    }
    return id;
  }

  Search(val: string) {
    if (val != "") {
      this.clientService.clientParameter.Search = val;
    }
    else {
      // alert("Fill the name first!!!");
      this.clientService.clientParameter.Search = '';
    }
    this.p = 1;
    this.clientService.clientParameter.PageStart = this.p;
    this.GetClients();
  }
}
