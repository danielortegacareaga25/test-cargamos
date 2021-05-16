import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AuthComponent } from './auth.component';



const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'register-user', component: RegisterUserComponent },
      { path: '**', redirectTo: 'sign-in' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
