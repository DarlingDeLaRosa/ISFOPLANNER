import { Component, OnInit } from '@angular/core';
import { alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { IndicadoresEstrategicosI } from '../interfaces/indicadorEstrategico.interface';
import { MedioVerificacionI } from '../interfaces/medio-verificacion.interface';
import { MedioVerificacionService } from '../services/medio-verificacion.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/appHelper.service';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PaginationI } from 'src/app/interfaces/Response.interfaces';

@Component({
  selector: 'app-mantenimiento-pei',
  templateUrl: './medio-verificacion.component.html',
  styleUrls: ['./medio-verificacion.component.css']
})
export class MedioVerificacionComponent implements OnInit {

  page: number = 1
  pagination!: PaginationI
  indicadoresEstartegicos: Array<IndicadoresEstrategicosI> = [];
  mediosVerificacion!: Array<MedioVerificacionI>;
  medioVerificacionForm: FormGroup;
  modulo = this.userSystemService.modulosSis

  constructor(
    private fb: FormBuilder,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private medioVerifService: MedioVerificacionService,
    private userSystemService: UserSystemInformationService,
  ) {
    this.medioVerificacionForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.getAllMedioVerifiacion();
  }

  getAllMedioVerifiacion() {
    this.medioVerifService.getMedioVerificacion(this.page)
      .subscribe((resp: any) => { this.mediosVerificacion = resp.data; this.pagination = resp.pagination; })
  }

  postMedioVerificacion() {
    this.medioVerifService.postMedioVerificacion(this.medioVerificacionForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllMedioVerifiacion(), this.medioVerificacionForm) })
  }

  putMedioVerificacion() {
    this.medioVerifService.updateMedioVerificacion(this.medioVerificacionForm.value, this.medioVerificacionForm.value.id)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllMedioVerifiacion(), this.medioVerificacionForm) })
  }

  setValueMedioVerificacion(mediosVerificacion: MedioVerificacionI) {
    this.medioVerificacionForm.reset(mediosVerificacion);
  }

  async deleteMedioVerificacion(medioVerificaicon: MedioVerificacionI) {
    let remove: boolean = await alertRemoveSure("¿Estas seguro de eliminar este medio de verificacion?")
    
    if (remove) {
      loading(true)
      this.medioVerifService.DeleteMedioVerificacion(medioVerificaicon.id!)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllMedioVerifiacion(), this.medioVerificacionForm) })
    }
  }
  
  saveChanges() {
    this.helperHandler.saveChanges(() => this.putMedioVerificacion(), this.medioVerificacionForm, () => this.postMedioVerificacion())
  }

  nextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page += 1
      this.getAllMedioVerifiacion()
    }
  }
  previousPage() {
    if (this.page > 1) {
      this.page -= 1
      ;this.getAllMedioVerifiacion()
    }
  }
}