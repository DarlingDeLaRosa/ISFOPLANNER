import { Component, OnInit } from '@angular/core';
import { EstrategiasService } from '../services/estrategias.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { EstrategiaI } from '../interfaces/estrategias.interface';
import { ResultadoEfectoService } from '../services/resultadoEfecto.service';
import { ResultadoEfectoI } from '../interfaces/resultadoEfecto';
import { HelperService } from 'src/app/services/appHelper.service';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PaginationI } from 'src/app/interfaces/Response.interfaces';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-resultado-efecto',
  templateUrl: './resultado-efecto.component.html',
  styleUrls: ['./resultado-efecto.component.css']
})
export class ResultadoEfectoComponent implements OnInit {

  page: number = 1
  pagination!: PaginationI
  resultadoEfectoForm: FormGroup;
  estrategia: Array<EstrategiaI> = [];
  resultadoefectos!: Array<ResultadoEfectoI>;
  modulo = this.userSystemService.modulosSis

  constructor(
    private fb: FormBuilder,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private estrategiasService: EstrategiasService,
    private resultadoEfectoService: ResultadoEfectoService,
    private userSystemService: UserSystemInformationService,
    // private announcer: LiveAnnouncer
  ) {
    this.resultadoEfectoForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      idEstrategia: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getAllEstrategia();
    this.getAllResultadoEfecto();
  }
  
  displayName(name: any): string {
    return name ? `${name.nombre}` : '';
  }

  getAllEstrategia() {
    this.estrategiasService.getEstrategias(1, 10, this.resultadoEfectoForm.value.idEstrategia)
      .subscribe((resp: any) => { this.estrategia = resp.data; })
  }

  getAllResultadoEfecto() {
    this.resultadoEfectoService.getResultadoEfecto(this.page)
      .subscribe((resp: any) => { this.resultadoefectos = resp.data; this.pagination = resp.pagination; })
  }

  setValueResultadoEfecto(resultadoEfecto: ResultadoEfectoI) {
    this.resultadoEfectoForm.setValue({
      id: resultadoEfecto.id!,
      nombre: resultadoEfecto.nombre,
      idEstrategia: resultadoEfecto.estrategia
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
    let removeDecision: boolean = await alertRemoveSure("¿Estas seguro de eliminar esta estrategia?")

    if (removeDecision) {
      loading(true)
      this.resultadoEfectoService.deleteResultadoEfecto(resultadoefectoId)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllResultadoEfecto(), this.resultadoEfectoForm) })
    }
  }

  saveChanges() {
    let resultEfect = this.resultadoEfectoForm.value
    this.resultadoEfectoForm.patchValue({
      idEstrategia: resultEfect.idEstrategia.id
    })
    this.helperHandler.saveChanges(() => this.putResultadoEfecto(), this.resultadoEfectoForm, () => this.postResultadoEfecto())
  }

  nextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page += 1
      this.getAllResultadoEfecto()
    }
  }
  previousPage() {
    if (this.page > 1) {
      this.page -= 1
      ;this.getAllResultadoEfecto()
    }
  }
}


