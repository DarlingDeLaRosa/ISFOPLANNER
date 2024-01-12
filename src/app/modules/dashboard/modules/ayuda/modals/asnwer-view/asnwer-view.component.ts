import { Component, Inject, OnInit } from '@angular/core';
import { PreguntaI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-asnwer-view',
  templateUrl: './asnwer-view.component.html',
  styleUrls: ['./asnwer-view.component.css']
})
export class AsnwerViewComponent implements OnInit{
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public pregunta_Asnwer: PreguntaI,
  ){
  }

  ngOnInit(): void {
  }
  
}
