import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoComponent} from './mantenimiento.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EstructuraProgramaticaComponent } from './components/estructura-programatica/estructura-programatica.component';
import { IndicadoresGestionComponent } from './components/indicadores-gestion/indicadores-gestion.component';
import { PreguntaFrecuentesComponent } from './components/pregunta-frecuentes/pregunta-frecuentes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MaterialDeApoyoComponent } from './components/material-apoyo/material-apoyo.component';
import { MantenimientoPeiComponent } from './components/mantenimiento-pei/mantenimiento-pei.component';
import { EjesComponent } from './components/mantenimiento-pei/ejes/ejes.component';
import { EstrategiasComponent } from './components/mantenimiento-pei/estrategias/estrategias.component';
import { IndicadoresEstrategicosComponent } from './components/mantenimiento-pei/indicadores-estrategicos/indicadores-estrategicos.component';
import { HttpClientModule } from '@angular/common/http';
import { ResultadoEfectoComponent } from './components/mantenimiento-pei/resultado-efecto/resultado-efecto.component';
import { RequerimientosComponent } from './components/mantenimiento-pei/Requerimientos/requerimientos.component';
import { SupuestosRiegosComponent } from './components/mantenimiento-pei/supuestos-riesgos/supuestos-riesgos.component';
import { MedioVerificacionComponent } from './components/mantenimiento-pei/medio-verificacion/medio-verificacion.component';

@NgModule({
  declarations: [
    MantenimientoComponent,
    EjesComponent,
    EstrategiasComponent,
    EstructuraProgramaticaComponent,
    IndicadoresEstrategicosComponent,
    IndicadoresGestionComponent,
    MaterialDeApoyoComponent,
    PreguntaFrecuentesComponent,
    ProductosComponent,
    ResultadoEfectoComponent,
    UsuariosComponent,
    MantenimientoPeiComponent,
    RequerimientosComponent,
    SupuestosRiegosComponent,
    MedioVerificacionComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class MantenimientoModule { }
