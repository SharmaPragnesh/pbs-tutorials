import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalClients: Number;
  constructor(public clientService: ClientService) { }

  ngOnInit(): void {
    this.GetClients();
  }

  GetClients() {
    this.clientService.GetClients().subscribe(res => {
      if (res != null)
        this.totalClients = res.length;
    })
  }

}
