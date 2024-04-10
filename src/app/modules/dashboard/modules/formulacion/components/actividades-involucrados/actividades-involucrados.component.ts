import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-actividades-involucrados',
  templateUrl: './actividades-involucrados.component.html',
  styleUrls: ['./actividades-involucrados.component.css']
})
export class ActividadesInvolucradosComponent implements OnInit{


  constructor(
    private actividadService: ActividadesService
  ){}

  ngOnInit(): void {
    this.getActividadesInvolucradas()
  }

  getActividadesInvolucradas(){
    this.actividadService.getActividadesInvolucradas().subscribe(
      (res: any) => { console.log(res);}
    )
  }
}
