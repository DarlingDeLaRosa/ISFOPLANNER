import { Component, OnInit } from '@angular/core';
import { SupuestosRiesgosService } from '../services/supuestos-riesgos.service';
import { catchError } from 'rxjs';
import { alertServerDown } from 'src/app/alerts/alerts';
import { SupuestosRiesgosI } from '../interfaces/supuestos-riesgos.interface';

@Component({
  selector: 'app-resultado-efecto',
  templateUrl: './supuestos-riesgos.component.html',
  styleUrls: ['./supuestos-riesgos.component.css']
})
export class SupuestosRiegosComponent implements OnInit{

    supuestosRiesgos: Array<SupuestosRiesgosI> = [];

    constructor(
        private supuestosRiesgosService: SupuestosRiesgosService,
    ) {}

    ngOnInit(): void {
        this.getAllSupuestosRiesgos();
  }

  getAllSupuestosRiesgos() {
    this.supuestosRiesgosService.getSupuestosRiesgos()
    .pipe(
      catchError((error) => {
        alertServerDown()
        return error
      }))
      .subscribe((resp: any) => {
      this.supuestosRiesgos = resp.data;
    })
  }
}
