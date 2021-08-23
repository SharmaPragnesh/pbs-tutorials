import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ClientDetailComponent } from './Components/Client/client-detail/client-detail.component';
import { ClientListComponent } from './Components/Client/client-list/client-list.component';
import { ClientComponent } from './Components/client/client.component';
import { ForgotPasswordComponent } from './Components/core/forgot-password/forgot-password.component';
import { LoginComponent } from './Components/core/login/login.component';
import { ResetPasswordComponent } from './Components/core/reset-password/reset-password.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EngagementListComponent } from './Components/Engagement/engagement-list/engagement-list.component';
import { EngagementComponent } from './Components/engagement/engagement.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:id', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'client-list', component: ClientListComponent, canActivate: [AuthGuard], },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'client-detail', component: ClientDetailComponent, canActivate: [AuthGuard] },
  { path: 'engagement-list', component: EngagementListComponent, canActivate: [AuthGuard] },
  { path: 'engagement', component: EngagementComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
