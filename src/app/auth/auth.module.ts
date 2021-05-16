import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AuthRoutingModule } from './auth.routing';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignInComponent, RegisterUserComponent, AuthComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule, ReactiveFormsModule],
  exports: [],
  providers: [],
})
export class AuthModule { }
