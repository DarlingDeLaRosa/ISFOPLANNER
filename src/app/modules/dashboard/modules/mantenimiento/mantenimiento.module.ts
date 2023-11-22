import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientoComponent} from './mantenimiento.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EjesComponent } from './components/ejes/ejes.component';
import { EstrategiasComponent } from './components/estrategias/estrategias.component';
import { EstructuraProgramaticaComponent } from './components/estructura-programatica/estructura-programatica.component';
import { IndicadoresEstrategicosComponent } from './components/indicadores-estrategicos/indicadores-estrategicos.component';
import { IndicadoresGestionComponent } from './components/indicadores-gestion/indicadores-gestion.component';
import { PreguntaFrecuentesComponent } from './components/pregunta-frecuentes/pregunta-frecuentes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ResultadoEfectoComponent } from './components/resultado-efecto/resultado-efecto.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MaterialDeApoyoComponent } from './components/material-apoyo/material-apoyo.component';
import { MantenimientoPeiComponent } from './components/mantenimiento-pei/mantenimiento-pei.component';

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
    MantenimientoPeiComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    MaterialModule,
  ]
})
export class MantenimientoModule { }
