import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './Components/Client/client-list/client-list.component';
import { ClientComponent } from './Components/client/client.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/client-list', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'client-list', component: ClientListComponent },
  { path: 'client', component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
