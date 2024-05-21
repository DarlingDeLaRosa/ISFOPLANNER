import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { authGuard, authGuardBackToLogIn } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
    import('./modules/dashboard/dashboard.routing.module').then((m) => m.DashboardRoutingModule)
  },
  {
    path: 'login',
    canActivate: [authGuardBackToLogIn],
    component: LogInComponent
  }, 
  { path: '**', redirectTo: '/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
