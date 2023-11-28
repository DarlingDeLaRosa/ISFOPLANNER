import { Component, OnInit } from '@angular/core';
import { IndicadorEstrategicoService } from '../services/indicadoresEstrategicos.service';
import { catchError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';
import { IndicadoresEstrategicosI } from '../interfaces/indicadorEstrategico.interface';
import { MedioVerificacionI } from '../interfaces/medio-verificacion.interface';
import { MedioVerificacionService } from '../services/medio-verificacion.service';

@Component({
  selector: 'app-mantenimiento-pei',
  templateUrl: './medio-verificacion.component.html',
  styleUrls: ['./medio-verificacion.component.css']
})
export class MedioVerificacionComponent implements OnInit{

  indicadoresEstartegicos: Array<IndicadoresEstrategicosI> = [];
  medioVerificacion: Array<MedioVerificacionI> = [];

  constructor(
    private indicadorEstrategicoService:IndicadorEstrategicoService,
    private medioVerifService: MedioVerificacionService,
  ){}
  
  ngOnInit(): void {
  this.getAllIndicadoresEstartegicos();
  this.getAllMedioVerifiacion();
  }

  getAllIndicadoresEstartegicos() {
    this.indicadorEstrategicoService.getIndicadoresEstrategicos().pipe(
      catchError((error) => {
        alertServerDown()
        return error
      })).subscribe((resp: any) => {
      this.indicadoresEstartegicos = resp.data;
    })
  }

  getAllMedioVerifiacion() {
    this.medioVerifService.getMedioVerificacion().pipe(
      catchError((error) => {
        alertServerDown()
        return error
      })).subscribe((resp: any) => {
      this.medioVerificacion = resp.data;
      console.log(this.medioVerificacion);
    })
  }


}