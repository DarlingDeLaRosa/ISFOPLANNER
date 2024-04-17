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
import { ChargingBoxComponent } from '../../components/charging-box/charging-box.component';
import { NoDataFoundComponent } from '../../components/no-data-found/no-data-found.component';

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
    ChargingBoxComponent,
    NoDataFoundComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class FormulacionModule { }
