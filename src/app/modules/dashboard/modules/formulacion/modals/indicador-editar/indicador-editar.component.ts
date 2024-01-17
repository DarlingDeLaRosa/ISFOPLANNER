import { Component, OnInit, Inject } from '@angular/core';
import { IndicadorGestionI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-indicador-editar',
  templateUrl: './indicador-editar.component.html',
  styleUrls: ['./indicador-editar.component.css']
})
export class IndicadorEditarComponent implements OnInit{
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public indicador: IndicadorGestionI,
  ){}

  ngOnInit(): void {
    console.log(this.indicador);
    
  }
  
}
