import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoComponent } from './mantenimiento.component';
import { IndicadoresGestionComponent } from './components/indicadores-gestion/indicadores-gestion.component';
import { EstructuraProgramaticaComponent } from './components/estructura-programatica/estructura-programatica.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MaterialDeApoyoComponent } from './components/material-apoyo/material-apoyo.component';
import { PreguntaFrecuentesComponent } from './components/pregunta-frecuentes/pregunta-frecuentes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { MantenimientoPeiComponent } from './components/mantenimiento-pei/mantenimiento-pei.component';
import { EstrategiasComponent } from './components/mantenimiento-pei/estrategias/estrategias.component';
import { IndicadoresEstrategicosComponent } from './components/mantenimiento-pei/indicadores-estrategicos/indicadores-estrategicos.component';
import { EjesComponent } from './components/mantenimiento-pei/ejes/ejes.component';
import { ResultadoEfectoComponent } from './components/mantenimiento-pei/resultado-efecto/resultado-efecto.component';
import { SupuestosRiegosComponent } from './components/mantenimiento-pei/supuestos-riesgos/supuestos-riesgos.component';
import { MedioVerificacionComponent } from './components/mantenimiento-pei/medio-verificacion/medio-verificacion.component';
import { AsignacionPresupuestoComponent } from './components/asignacion-presupuesto/asignacion-presupuesto.component';
import { ConfiguracionPeriodosComponent } from './components/configuracion-periodos/configuracion-periodos.component';
import { RequerimientosComponent } from './components/mantenimiento-pei/Requerimientos/requerimientos.component';
import { PresupuestoInstitucionalComponent } from './components/presupuesto-institucional/presupuesto-institucional.component';
import { RolesComponent } from './components/roles/roles.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'mantenimientoPoa',
        component: MantenimientoComponent,
        children: [
          {
            path: 'ejes',
            component: EjesComponent,
            outlet: 'mantenimiento'
          },
          {
            path: 'estrategias',
            component: EstrategiasComponent,
            outlet: 'mantenimiento'
          },
          {
            path: 'resultadoEfecto',
            component: ResultadoEfectoComponent,
            outlet: 'mantenimiento'
          },
          {
            path: 'indicadoresGestion',
            component: IndicadoresGestionComponent,
            outlet: 'mantenimiento'
          },
          {
            path: 'productos',
            component: ProductosComponent,
            outlet: 'mantenimiento'
          },
          {
            path: 'indicadoresEstrategicos',
            component: IndicadoresEstrategicosComponent,
            outlet: 'mantenimiento'
          },
          {
            path: 'ejesI',
            component: EjesComponent,
            outlet: 'mantenimiento'
          },
          {
            path: 'estrategias',
            component: EstrategiasComponent,
            outlet: 'mantenimiento'
          },
          {
            path: 'resultadoEfecto',
            component: ResultadoEfectoComponent,
            outlet: 'mantenimiento'
          },
        ]
      }
    ]
  },
  {
    path: 'mantenimientoPei',
    component: MantenimientoPeiComponent,
    children: [
      {
        path: 'presupuesto-institucional',
        component: PresupuestoInstitucionalComponent,
        outlet: 'mantenimiento'
      },
      {
        path: 'requerimientos',
        component: RequerimientosComponent,
        outlet: 'mantenimiento'
      },
      {
        path: 'supuestosriesgos',
        component: SupuestosRiegosComponent,
        outlet: 'mantenimiento'
      },
      {
        path: 'medio-verificacion',
        component: MedioVerificacionComponent,
        outlet: 'mantenimiento'
      },
      {
        path: 'material-apoyo',
        component: MaterialDeApoyoComponent,
        outlet: 'mantenimiento'
      },
      {
        path: 'preguntas-frecuentes',
        component: PreguntaFrecuentesComponent,
        outlet: 'mantenimiento'
      },
      {
        path: 'asignacion-presupuesto',
        component: AsignacionPresupuestoComponent,
        outlet: 'mantenimiento'
      },
      {
        path: 'configuracion-periodos',
        component: ConfiguracionPeriodosComponent,
        outlet: 'mantenimiento'
      },
      {
        path: 'estructuraProgramatica',
        component: EstructuraProgramaticaComponent,
        outlet: 'mantenimiento'
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        outlet: 'mantenimiento'
      },
      {
        path: 'roles',
        component: RolesComponent,
        outlet: 'mantenimiento'
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
