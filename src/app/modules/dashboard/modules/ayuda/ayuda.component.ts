import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { preguntasFrecuentesService } from '../mantenimiento/services/preguntas-frecuentes.service';
import { alertServerDown } from 'src/app/alerts/alerts';
import { catchError } from 'rxjs';

@Component({
  selector: 'ayuda-root',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {
  
  getPreguntas: any[] = []
  
  constructor(
    public dialog: MatDialog,
    private apiPreguntas: preguntasFrecuentesService
  ){}

  ngOnInit(): void {
    
  }

  getPregunta() {
    this.apiPreguntas.getPreguntasFrecuentes()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        })
      )
      .subscribe((res: any) => {
        this.getPreguntas = res.data
      })
  }

}
