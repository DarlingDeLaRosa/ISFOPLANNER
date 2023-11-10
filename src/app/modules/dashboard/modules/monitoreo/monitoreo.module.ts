import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoreoComponent } from './monitoreo.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    MonitoreoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule
  ]
})
export class MonitoreoModule { }
