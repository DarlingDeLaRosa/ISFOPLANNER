import { Component, OnInit } from '@angular/core';
import { MaterialApoyoService } from '../mantenimiento/services/material-apoyo.service';
import { PaginationI } from 'src/app/interfaces/Response.interfaces';

@Component({
  selector: 'material-apoyo-root',
  templateUrl: './material-apoyo.component.html',
  styleUrls: ['./material-apoyo.component.css']
})
export class MaterialApoyoComponent implements OnInit{
  
  page: number = 1
  pagination!: PaginationI
  materialName: string = ''
  materialesApoyo!: any[]

  constructor(
    private apiMaterial: MaterialApoyoService,
  ){}
  
  ngOnInit(): void {
    this.getMaterial()
  }

  getMaterial() {
    this.apiMaterial.getMaterialApoyo(this.page, this.materialName)
      .subscribe((res: any) => { this.materialesApoyo = res.data })
  }
}
