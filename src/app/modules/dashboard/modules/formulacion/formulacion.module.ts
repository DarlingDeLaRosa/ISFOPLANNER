import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulacionComponent} from './formulacion.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductoFormulacionComponent } from './components/producto-formulacion/producto-formulacion.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndicadorEditarComponent } from './modals/indicador-editar/indicador-editar.component';
import { ActividadesFormulacionComponent } from './components/actividades-formulacion/actividades-formulacion.component';
import { NuevoInsumoComponent } from './modals/nuevo-insumo/nuevo-insumo.component';
import { HttpClientModule } from '@angular/common/http';
import { IndicadorEditarRecintosComponent } from './modals/indicador-editar-recintos/indicador-editar-recintos.component';
import { IndicadoresFormulacionComponent } from './components/indicadores-formulacion/indicadores-formulacion.component';
import { ActividadesInvolucradosComponent } from './components/actividades-involucrados/actividades-involucrados.component';
import { ChargingBoxModule } from '../../components/charging-box/charging-box.module';

@NgModule({
  declarations: [
    FormulacionComponent,
    NuevoInsumoComponent,
    IndicadorEditarComponent,
    ProductoFormulacionComponent,
    ActividadesFormulacionComponent,
    IndicadorEditarRecintosComponent,
    IndicadoresFormulacionComponent,
    ActividadesInvolucradosComponent,
  ],
  imports: [
    ChargingBoxModule,
    RouterModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class FormulacionModule { }
