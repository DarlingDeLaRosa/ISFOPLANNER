import { Component, OnInit } from '@angular/core';
import { EstrategiasService } from '../services/estrategias.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertRemoveSure, alertServerDown, successMessageAlert } from 'src/app/alerts/alerts';
import { EstrategiaI } from '../interfaces/estrategias.interface';
import { ResultadoEfectoService } from '../services/resultadoEfecto.service';
import { ResultadoEfectoI } from '../interfaces/resultadoEfecto';
import { HelperService } from 'src/app/services/appHelper.service';

@Component({
  selector: 'app-resultado-efecto',
  templateUrl: './resultado-efecto.component.html',
  styleUrls: ['./resultado-efecto.component.css']
})
export class ResultadoEfectoComponent implements OnInit {

  resultadoEfectoForm: FormGroup;
  estrategia: Array<EstrategiaI> = [];
  resultadoefectos: Array<ResultadoEfectoI> = [];

  constructor(
    private fb: FormBuilder,
    private helperHandler: HelperService,
    private estrategiasService: EstrategiasService,
    private resultadoEfectoService: ResultadoEfectoService,
  ) {
    this.resultadoEfectoForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      idEstrategia: new FormControl<number>(0, Validators.required),
    })
  }

  ngOnInit(): void {
    this.getAllEstrategia();
    this.getAllResultadoEfecto();
  }

  getAllEstrategia() {
    this.estrategiasService.getEstrategias()
      .subscribe((resp: any) => { this.estrategia = resp.data; })
  }

  getAllResultadoEfecto() {
    this.resultadoEfectoService.getResultadoEfecto()
      .subscribe((resp: any) => { this.resultadoefectos = resp.data; })
  }

  setValueResultadoEfecto(resultadoEfecto: ResultadoEfectoI) {
    this.resultadoEfectoForm.setValue({
      id: resultadoEfecto.id!,
      nombre: resultadoEfecto.nombre,
      idEstrategia: resultadoEfecto.estrategia.id
    });
  }

  postResultadoEfecto() {
    this.resultadoEfectoService.postResultadoEfecto(this.resultadoEfectoForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllResultadoEfecto(), this.resultadoEfectoForm) })
  }

  putResultadoEfecto() {
    this.resultadoEfectoService.updateResultadoEfecto(this.resultadoEfectoForm.value, this.resultadoEfectoForm.value.id)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllResultadoEfecto(), this.resultadoEfectoForm) })
  }

  async deleteResultadoEfecto(resultadoefectoId: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar esta estrategia?")

    if (removeDecision) {
      this.resultadoEfectoService.deleteResultadoEfecto(resultadoefectoId)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllResultadoEfecto(), this.resultadoEfectoForm) })
    }
  }

  saveChanges() {
    this.helperHandler.saveChanges(() => this.putResultadoEfecto(), this.resultadoEfectoForm, () => this.postResultadoEfecto())
  }
}


