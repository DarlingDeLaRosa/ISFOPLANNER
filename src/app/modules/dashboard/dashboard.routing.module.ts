import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardComponent } from './dashboard.component';
import { formulacionPeriodoGuard } from './guards/fomulacion-periodo.guard';

const routes: Routes = [
  {
    path: '',
    component: dashboardComponent,
    children:[
      {
        path: 'panelDeControl',
        loadChildren: ()=>
        import('./modules/control-panel/control-panel.routing.module').then((m)=>m.ControlPanelRoutingModule)
      },
      {
        path: 'formulacion',
        canActivate: [formulacionPeriodoGuard], 
        loadChildren: ()=>
        import('./modules/formulacion/formulacion.routing.module').then((m)=>m.FormulacionRoutingModule)
      },
      {
        path: 'monitoreo',
        loadChildren: ()=>
        import('./modules/monitoreo/monitoreo.routing.module').then((m)=>m.MonitoreoRoutingModule)
      },
      {
        path: 'planesTransversales',
        loadChildren: ()=>
        import('./modules/planes-transversales/planes-transversales.routing.module').then((m)=>m.PlanesTransversalesRoutingModule)
      },
      // {
      //   path: 'rendicionDeCuentas',
      //   loadChildren: ()=>
      //   import('./modules/rendicion-de-cuentas/rendicion-de-cuentas.routing.module').then((m)=>m.RendicionDeCuentasRoutingModule)
      // },
      {
        path: 'materialDeApoyo',
        loadChildren: ()=>
        import('./modules/material-apoyo/material-apoyo.routing.module').then((m)=>m.MaterialDeApoyoRoutingModule)
      },
      {
        path: 'ayuda',
        loadChildren: ()=>
        import('./modules/ayuda/ayuda.routing.module').then((m)=>m.AyudaRoutingModule)
      },
      {
        path: 'mantenimiento',
        loadChildren: ()=>
        import('./modules/mantenimiento/mantenimiento.routing.module').then((m)=>m.MantenimientoRoutingModule)
      },
      {
        path: 'asignacionPresupuesto',
        loadChildren: ()=>
        import('./modules/asignacion-subunidades/asignacion-subunidades.routing.module').then((m)=>m.AsignacionSubunidadesRoutingModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
