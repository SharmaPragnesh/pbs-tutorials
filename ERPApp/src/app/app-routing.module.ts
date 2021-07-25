import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { LoginComponent } from './Components/Core/login/login.component';
import { RegisterComponent } from './Components/Core/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { NoteListComponent } from './Components/note-list/note-list.component';
import { ForgotPasswordComponent } from './Components/Core/forgot-password/forgot-password.component';
import { ActivateUserComponent } from './Components/Core/register/activate-user/activate-user.component';
import { ResetPasswordComponent } from './Components/Core/reset-password/reset-password.component';
import { NoteSearchListComponent } from './Components/note-list/note-search-list/note-search-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'note-list', component: NoteListComponent },
  { path: 'note-list/:id', component: NoteListComponent },
  { path: 'note-search-list', component: NoteSearchListComponent },
  { path: 'note-search-list/:id', component: NoteSearchListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'activate-user/:id', component: ActivateUserComponent },
  { path: 'reset-password/:id', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
