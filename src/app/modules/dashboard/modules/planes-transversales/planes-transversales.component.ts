import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../formulacion/services/actividades.service';
import { ActividadI } from '../formulacion/interfaces/formulacion.interface';

@Component({
  selector: 'planes-transversales-root',
  templateUrl: './planes-transversales.component.html',
  styleUrls: ['./planes-transversales.component.css']
})
export class PlanesTransversalesComponent implements OnInit{

  actividadesPerito!: ActividadI[]

  constructor(
    private actividadesService: ActividadesService
  ){}

  ngOnInit(): void {
    this.getActividadesPerito()
  }

  getActividadesPerito(){
    this.actividadesService.getActividadesPerito().subscribe((res: any)=>{
      this.actividadesPerito = res.data
      console.log(res);
    })
  }
}
