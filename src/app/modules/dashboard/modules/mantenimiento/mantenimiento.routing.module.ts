import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoComponent } from './mantenimiento.component';
import { EjesComponent } from './components/ejes/ejes.component';
import { EstrategiasComponent } from './components/estrategias/estrategias.component';
import { ResultadoEfectoComponent } from './components/resultado-efecto/resultado-efecto.component';
import { IndicadoresEstrategicosComponent } from './components/indicadores-estrategicos/indicadores-estrategicos.component';
import { IndicadoresGestionComponent } from './components/indicadores-gestion/indicadores-gestion.component';
import { EstructuraProgramaticaComponent } from './components/estructura-programatica/estructura-programatica.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MaterialDeApoyoComponent } from './components/material-apoyo/material-apoyo.component';
import { PreguntaFrecuentesComponent } from './components/pregunta-frecuentes/pregunta-frecuentes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { MantenimientoPeiComponent } from './components/mantenimiento-pei/mantenimiento-pei.component';

const routes: Routes = [
  {
    path: '',
    children:[
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
            component: IndicadoresGestionComponent ,
            outlet: 'mantenimiento'
          },

          {
            path: 'productos',
            component: ProductosComponent,
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
            path: 'material-apoyo',
            component: MaterialDeApoyoComponent,
            outlet: 'mantenimiento'
          },
          {
            path: 'preguntas-frecuentes',
            component: PreguntaFrecuentesComponent,
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
        path: 'indicadoresEstrategicos',
        component: IndicadoresEstrategicosComponent,
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
