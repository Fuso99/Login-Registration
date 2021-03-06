import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './features/profile/profile.component';
import {LoginComponent} from './features/login/login.component';
import {RegistrationComponent} from './features/registration/registration.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent },
  {path: 'registration', component: RegistrationComponent },
  {path:'**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
