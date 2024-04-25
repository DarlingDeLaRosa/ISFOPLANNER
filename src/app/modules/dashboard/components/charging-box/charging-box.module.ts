import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargingBoxComponent } from './charging-box.component';
import { NoDataFoundComponent } from '../no-data-found/no-data-found.component';



@NgModule({
  declarations: [
    ChargingBoxComponent,
    NoDataFoundComponent
  ],
  exports:[
    ChargingBoxComponent,
    NoDataFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChargingBoxModule { }
