import { Component, OnInit } from '@angular/core';
import { EjesService } from '../mantenimiento/components/mantenimiento-pei/services/ejes.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EstrategiasService } from '../mantenimiento/components/mantenimiento-pei/services/estrategias.service';
import { EstrategiaI } from '../mantenimiento/components/mantenimiento-pei/interfaces/estrategias.interface';
import { ResultadoEfectoI } from '../mantenimiento/components/mantenimiento-pei/interfaces/resultadoEfecto';
import { ResultadoEfectoService } from '../mantenimiento/components/mantenimiento-pei/services/resultadoEfecto.service';
import { ProductoService } from '../mantenimiento/services/producto.service';
import { Router } from '@angular/router';
import { EjesI } from '../mantenimiento/components/mantenimiento-pei/interfaces/ejes.interface';
import { PresupuestoInstitucionalService } from '../mantenimiento/services/presupuestoInstitucional.service';

@Component({
  selector: 'formulacion-root',
  templateUrl: './formulacion.component.html',
  styleUrls: ['./formulacion.component.css']
})
export class FormulacionComponent implements OnInit {

  estrategias: Array<EstrategiaI> = [];
  ejesEstrategicos: Array<EjesI> = [];
  resultadosEfecto: Array<ResultadoEfectoI> = [];
  selectedEjesEstrategico: EjesI = { estrategias: {}, id: 0, nombre: "", numeroEje: 0, objetivo: "" };
  selectedEstrategia: EstrategiaI = { ejeEstrategico: { id: 0, nombre: '', objetivo: '', numeroEje: 0, }, id: 0, nombre: "", resultadosEfectos: [] };
  selectedResultadoE: ResultadoEfectoI = { estrategia: { id: 0, nombre: '', ejeEstrategico: { id: 0, nombre: '', objetivo: '', numeroEje: 0, }, resultadosEfectos: [] }, id: 0, nombre: "" }
  productos: any[] = [];
  filterForm: FormGroup;
  presupuestosUnidad: { monto: number, montoRestante: number, montoEjecutado: number } = { monto: 0, montoRestante: 0, montoEjecutado: 0 }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ejesService: EjesService,
    private apiProducto: ProductoService,
    private estrategiasService: EstrategiasService,
    private resultadoEfectoService: ResultadoEfectoService,
    private apiPresupuestoInstitucional: PresupuestoInstitucionalService,
  ) {

    this.filterForm = this.fb.group({
      estrategias: new FormControl(''),
      ejesEstrategico: new FormControl(''),
      resultadoEfecto: new FormControl(''),
    })

    this.filterForm.valueChanges.subscribe(() => { this.getProducto() })
  }

  ngOnInit(): void {
    this.getPresupuestoUnidad();
    this.getAllEjes()
    this.getProducto()
    this.getAllEstrategia();
    this.getAllResultadoEfecto();
  }

  getPresupuestoUnidad() {
    this.apiPresupuestoInstitucional.getPresupuestoUnidad().subscribe((res: any) => 
    { this.presupuestosUnidad = res.data })
  }

  enviarProducto(producto: number) {
    this.router.navigate(['/dashboard/formulacion/producto'], { queryParams: { id: producto } });
  }

  getAllResultadoEfecto() {
    this.resultadoEfectoService.getResultadoEfecto()
      .subscribe((resp: any) => { this.resultadosEfecto = resp.data; })
  }

  getAllEjes() {
    this.ejesService.getEjes()
      .subscribe((resp: any) => { this.ejesEstrategicos = resp.data; })
  }

  getAllEstrategia() {
    this.estrategiasService.getEstrategias()
      .subscribe((resp: any) => { this.estrategias = resp.data; })
  }

  getProducto() {
    const { ejesEstrategico, estrategias, resultadoEfecto } = this.filterForm.value
    this.apiProducto.getProducto(ejesEstrategico, estrategias, resultadoEfecto).subscribe((res: any) => { 
      this.productos = res.data; 

      if (ejesEstrategico > 0) [this.selectedEstrategia] = this.estrategias.filter((estrategia: EstrategiaI)=> estrategia.id == estrategias) 
      if (ejesEstrategico > 0) [this.selectedEjesEstrategico] = this.ejesEstrategicos.filter((ejeEs: EjesI)=> ejeEs.id == ejesEstrategico) 
      if (ejesEstrategico > 0) [this.selectedResultadoE] = this.resultadosEfecto.filter((ejeEs: ResultadoEfectoI )=> ejeEs.id == resultadoEfecto) 
    })
  }
}
