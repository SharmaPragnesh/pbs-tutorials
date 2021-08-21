import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Engagement } from 'src/app/Models/engagement.model';
import { EngagementService } from 'src/app/Services/engagement.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  selectedClientId: number;
  selectedClientName: string;
  engagementList: Engagement[];
  totalEngagement: number;

  constructor(public engagementService: EngagementService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('selectedClientId') != null) {
      this.selectedClientId = Number.parseInt(localStorage.getItem('selectedClientId'));
    }

    if (localStorage.getItem('selectedClientName') != null) {
      this.selectedClientName = localStorage.getItem('selectedClientName');
    }

    this.GetEngagements(this.selectedClientId);
  }

  AddEditEngagement(engagementId: number) {
    localStorage.setItem('engagementId', engagementId.toString());
    this.router.navigate(['/engagement']);
    // alert('add edit' + engagementId);
  }

  GetEngagements(clientId: number) {
    this.engagementService.GetEngagements(clientId).subscribe(res => {
      // console.log(res);
      this.engagementList = res;
      this.totalEngagement = this.engagementList.length;
    });
  }

  SelectEngagement(engagement: Engagement) {

  }

}
