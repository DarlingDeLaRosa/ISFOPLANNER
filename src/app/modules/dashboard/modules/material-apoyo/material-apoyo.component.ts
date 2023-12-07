import { Component, OnInit } from '@angular/core';
import { MaterialApoyoService } from '../mantenimiento/services/material-apoyo.service';
import { catchError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';

@Component({
  selector: 'material-apoyo-root',
  templateUrl: './material-apoyo.component.html',
  styleUrls: ['./material-apoyo.component.css']
})
export class MaterialApoyoComponent implements OnInit{
  
  materialesApoyo: any[] = []

  constructor(
    private apiMaterial: MaterialApoyoService,
  ){}
  
  ngOnInit(): void {
    this.getMaterial()
  }

  getMaterial() {
    this.apiMaterial.getMaterialApoyo()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        console.log(res);
        
        this.materialesApoyo = res.data
      })
  }
}
