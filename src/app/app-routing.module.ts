import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';

const routes: Routes = [
  {
    path: 'dashboard',
    //canActivate: [authGuard],
    loadChildren: ()=>
    import('./modules/dashboard/dashboard.routing.module').then((m)=>m.DashboardRoutingModule)
  },
  { path: '',  component: LogInComponent,  }, //canActivate: [authGuardBack],
  //{ path: '**', redirectTo: '/'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
