import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MantenimientoComponent} from './mantenimiento.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesComponent } from './components/roles/roles.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolesViewComponent } from './modals/roles-view/roles-view.component';
import { ProductosComponent } from './components/productos/productos.component';
import { DetailViewComponent } from './modals/detail-view/detail-view.component';
import { EjesComponent } from './components/mantenimiento-pei/ejes/ejes.component';
import { EntidadListViewComponent } from './modals/entidad-list-view/responsible-view.component';
import { MaterialDeApoyoComponent } from './components/material-apoyo/material-apoyo.component';
import { ResponsableService } from './components/mantenimiento-pei/services/reponsable.service';
import { MantenimientoPeiComponent } from './components/mantenimiento-pei/mantenimiento-pei.component';
import { EstrategiasComponent } from './components/mantenimiento-pei/estrategias/estrategias.component';
import { PreguntaFrecuentesComponent } from './components/pregunta-frecuentes/pregunta-frecuentes.component';
import { IndicadoresGestionComponent } from './components/indicadores-gestion/indicadores-gestion.component';
import { MedioVerificacionService } from './components/mantenimiento-pei/services/medio-verificacion.service';
import { RequerimientosComponent } from './components/mantenimiento-pei/Requerimientos/requerimientos.component';
import { ResultadoEfectoComponent } from './components/mantenimiento-pei/resultado-efecto/resultado-efecto.component';
import { AsignacionPresupuestoComponent } from './components/asignacion-presupuesto/asignacion-presupuesto.component';
import { ConfiguracionPeriodosComponent } from './components/configuracion-periodos/configuracion-periodos.component';
import { SupuestosRiegosComponent } from './components/mantenimiento-pei/supuestos-riesgos/supuestos-riesgos.component';
import { EstructuraProgramaticaComponent } from './components/estructura-programatica/estructura-programatica.component';
import { MedioVerificacionComponent } from './components/mantenimiento-pei/medio-verificacion/medio-verificacion.component';
import { IndicadoresEstrategicosComponent } from './components/mantenimiento-pei/indicadores-estrategicos/indicadores-estrategicos.component';
import { PresupuestoInstitucionalComponent } from './components/presupuesto-institucional/presupuesto-institucional.component';

@NgModule({
  declarations: [
    EjesComponent,
    RolesComponent,
    UsuariosComponent,
    ProductosComponent,
    RolesViewComponent,
    DetailViewComponent,
    EstrategiasComponent,
    MantenimientoComponent,
    RequerimientosComponent,
    ResultadoEfectoComponent,
    SupuestosRiegosComponent,
    MaterialDeApoyoComponent,
    EntidadListViewComponent,
    MantenimientoPeiComponent,
    MedioVerificacionComponent,
    PreguntaFrecuentesComponent,
    IndicadoresGestionComponent,
    ConfiguracionPeriodosComponent,
    AsignacionPresupuestoComponent,
    EstructuraProgramaticaComponent,
    IndicadoresEstrategicosComponent,
    PresupuestoInstitucionalComponent,
  ],

  providers:[
    ResponsableService,
    MedioVerificacionService,
  ],
  
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class MantenimientoModule { }
