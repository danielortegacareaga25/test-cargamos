import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);;
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);
const routes: Routes = [
  {
    path: 'dashboard', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }, loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'auth', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToDashboard }, loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
