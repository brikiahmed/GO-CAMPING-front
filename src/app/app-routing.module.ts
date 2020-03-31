import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {NewPasswordComponent} from './auth/new-password/new-password.component';


const routes: Routes = [
  {path : 'login' ,
    component: LoginComponent
  },
  {path : 'register' ,
    component: RegisterComponent
  },

  {
    path: 'new-password/:token',
    component: NewPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
