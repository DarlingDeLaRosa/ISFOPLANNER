import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialApoyoComponent } from './material-apoyo.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { ChargingBoxModule } from '../../components/charging-box/charging-box.module';

@NgModule({
  declarations: [
    MaterialApoyoComponent
  ],
  imports: [
    ChargingBoxModule,
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule
  ]
})
export class MaterialApoyoModule { }
