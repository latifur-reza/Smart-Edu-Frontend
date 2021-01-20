import { AuthpanelRoutes } from './authpanel.router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthpanelRoutes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthpanelModule { }
