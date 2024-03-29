import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsnwerViewComponent } from './modals/asnwer-view/asnwer-view.component';
import { PreguntaI } from '../mantenimiento/interfaces/mantenimientoPOA.interface';
import { preguntasFrecuentesService } from '../mantenimiento/services/preguntas-frecuentes.service';

@Component({
  selector: 'ayuda-root',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {
  
  getPreguntas!: any[]
  
  constructor(
    public dialog: MatDialog,
    private apiPreguntas: preguntasFrecuentesService
  ){}

  ngOnInit(): void {
    this.getPregunta()
  }
  
  getPregunta() {
    this.apiPreguntas.getPreguntasFrecuentes()
      .subscribe((res: any) => { this.getPreguntas = res.data })
  }

  openModal(pregunta: PreguntaI) {
    this.dialog.open(AsnwerViewComponent, {data: pregunta})
  }

}
