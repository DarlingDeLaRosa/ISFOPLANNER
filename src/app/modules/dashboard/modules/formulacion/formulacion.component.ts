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
import { Router } from '@angular/router';

@Component({
  selector: 'formulacion-root',
  templateUrl: './formulacion.component.html',
  styleUrls: ['./formulacion.component.css']
})
export class FormulacionComponent implements OnInit {

  estrategias: Array<EstrategiaI> = [];
  ejesEstrategicos: Array<any> = [];
  resultadosEfecto: Array<ResultadoEfectoI> = [];
  productos: any[] = [];
  filterForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private ejesService: EjesService,
    private resultadoEfectoService: ResultadoEfectoService,
    private estrategiasService: EstrategiasService,
    private apiProducto: ProductoService,
    private router: Router
  ) {

    this.filterForm = this.fb.group({
      ejesEstrategico: new FormControl(''),
      estrategias: new FormControl(''),
      resultadoEfecto: new FormControl(''),
    })

    this.filterForm.valueChanges.subscribe(() => {
      console.log(this.filterForm.value.ejesEstrategico);
    })
  }

  ngOnInit(): void {
    this.getProducto()
    // this.getAllEjes();
    this.getAllResultadoEfecto();
    this.getAllEstrategia();
  }

  enviarProducto(producto:number) {
  this.router.navigate(['/dashboard/formulacion/producto'], { queryParams: {numero: producto}  });
  }

  getAllResultadoEfecto() {
    this.resultadoEfectoService.getResultadoEfecto()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        this.resultadosEfecto = resp.data;
      })
  }

  // getAllEjes() {
  //   this.ejesService.getEjes()
  //     .pipe(
  //       catchError((error) => {
  //         alertServerDown()
  //         return error
  //       }))
  //     .subscribe((resp: any) => {

  //       this.ejesEstrategicos = resp.data;
  //     })
  // }

  getAllEstrategia() {
    this.estrategiasService.getEstrategias()
      .pipe(
        catchError((error) => {
          alertServerDown()
          return error
        }))
      .subscribe((resp: any) => {
        this.estrategias = resp.data;
      })
  }


  getProducto() {
    this.apiProducto.getProducto()
      .subscribe((res: any) => {
        console.log(res);
        
        res.data.map((indicador:any)=>{
          
          if(this.ejesEstrategicos.some((item:any)=> item.id !== indicador.indicadorEstrategico.resultadoEfecto.estrategia.ejeEstrategico.id) || this.ejesEstrategicos.length < 1 ){
            this.ejesEstrategicos.push(indicador.indicadorEstrategico.resultadoEfecto.estrategia.ejeEstrategico)
          }

          // if(this.estrategias.some((item:any)=> item.id !== indicador.indicadorEstrategico.id) || this.ejesEstrategicos.length < 1 ){
          //   this.ejesEstrategicos.push(indicador.indicadorEstrategico)
          // }
          
        })


        this.productos = res.data
      })
  }
}
