import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { MyFilesComponent } from './my-files/my-files.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { AuthGuard } from '../Admin/auth.guard';

const routes: Routes = [
  {
    path: 'user', component: UserComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'about-me', component: AboutMeComponent },
          { path: 'monitoring', component: MonitoringComponent },
          { path: 'my-files', component: MyFilesComponent }
        ],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
