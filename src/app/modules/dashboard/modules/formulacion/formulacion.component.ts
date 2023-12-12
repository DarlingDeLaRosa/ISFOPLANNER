import { Component, OnInit } from '@angular/core';
import { EjesService } from '../mantenimiento/components/mantenimiento-pei/services/ejes.service';
import { alertServerDown } from 'src/app/alerts/alerts';
import { catchError, throwError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EstrategiasService } from '../mantenimiento/components/mantenimiento-pei/services/estrategias.service';
import { EstrategiaI } from '../mantenimiento/components/mantenimiento-pei/interfaces/estrategias.interface';
import { EjesI } from '../mantenimiento/components/mantenimiento-pei/interfaces/ejes.interface';
import { ResultadoEfectoI } from '../mantenimiento/components/mantenimiento-pei/interfaces/resultadoEfecto';
import { ResultadoEfectoService } from '../mantenimiento/components/mantenimiento-pei/services/resultadoEfecto.service';
import { ProductoService } from '../mantenimiento/services/producto.service';

@Component({
  selector: 'formulacion-root',
  templateUrl: './formulacion.component.html',
  styleUrls: ['./formulacion.component.css']
})
export class FormulacionComponent implements OnInit {

  estrategias: Array<EstrategiaI> = [];
  ejesEstrategicos: Array<EjesI> = [];
  resultadosEfecto: Array<ResultadoEfectoI> = [];
  productos: any[] = [];
  filterForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private ejesService: EjesService,
    private resultadoEfectoService: ResultadoEfectoService,
    private estrategiasService: EstrategiasService,
    private apiProducto: ProductoService
  ) {

    this.filterForm = this.fb.group({
      ejesEstrategico: new FormControl(''),
      estrategias: new FormControl(''),
      resultadoEfecto: new FormControl(''),
    })

    this.filterForm.valueChanges.subscribe(() => {
      this.getAllEstrategia();
    })
  }

  ngOnInit(): void {
    this.getAllEjes();
    this.getAllResultadoEfecto();
    this.getAllEstrategia();
    this.getProducto()
  }

  getAllResultadoEfecto() {
    this.resultadoEfectoService.getResultadoEfecto()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        console.log(resp);
        this.resultadosEfecto = resp.data;
      })
  }

  getAllEjes() {
    this.ejesService.getEjes()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        console.log(resp);

        this.ejesEstrategicos = resp.data;
      })
  }

  getAllEstrategia() {
    this.estrategiasService.getEstrategias()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        console.log(resp);

        this.estrategias = resp.data;
      })
  }

  
  getProducto() {
    this.apiProducto.getProducto()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return throwError(error)
        })
      )
      .subscribe((res: any) => {
        console.log(res);
        this.productos = res.data
      })
  }
}
