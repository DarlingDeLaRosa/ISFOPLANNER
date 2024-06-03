import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsnwerViewComponent } from './modals/asnwer-view/asnwer-view.component';
import { PreguntaI } from '../mantenimiento/interfaces/mantenimientoPOA.interface';
import { preguntasFrecuentesService } from '../mantenimiento/services/preguntas-frecuentes.service';
import { PaginationI } from 'src/app/interfaces/Response.interfaces';

@Component({
  selector: 'ayuda-root',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {
  
  page: number = 1
  getPreguntas!: any[]
  pagination!: PaginationI
  questionName: string = ''

  constructor(
    public dialog: MatDialog,
    private apiPreguntas: preguntasFrecuentesService
  ){}

  ngOnInit(): void {
    this.getPregunta()
  }
  
  getPregunta() {
    this.apiPreguntas.getPreguntasFrecuentes(this.page, this.questionName)
      .subscribe((res: any) => { this.getPreguntas = res.data })
  }

  openModal(pregunta: PreguntaI) {
    this.dialog.open(AsnwerViewComponent, {data: pregunta})
  }

}
