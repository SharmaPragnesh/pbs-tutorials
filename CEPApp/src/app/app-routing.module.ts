import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailComponent } from './Components/Client/client-detail/client-detail.component';
import { ClientListComponent } from './Components/Client/client-list/client-list.component';
import { ClientComponent } from './Components/client/client.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EngagementListComponent } from './Components/Engagement/engagement-list/engagement-list.component';
import { EngagementComponent } from './Components/engagement/engagement.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'client-list', component: ClientListComponent },
  { path: 'client', component: ClientComponent },
  { path: 'client-detail', component: ClientDetailComponent },
  { path: 'engagement-list', component: EngagementListComponent },
  { path: 'engagement', component: EngagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
