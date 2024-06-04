import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { ActividadI } from '../../interfaces/formulacion.interface';

@Component({
  selector: 'app-actividades-involucrados',
  templateUrl: './actividades-involucrados.component.html',
  styleUrls: ['./actividades-involucrados.component.css']
})
export class ActividadesInvolucradosComponent implements OnInit{

  sharedAct!: ActividadI[]

  constructor(
    private actividadService: ActividadesService
  ){}

  ngOnInit(): void {
    this.getActividadesInvolucradas()
  }

  getActividadesInvolucradas(){
    this.actividadService.getActividadesInvolucradas().subscribe(
      (res: any) => { this.sharedAct = res.data ; }
    )
  }
}
