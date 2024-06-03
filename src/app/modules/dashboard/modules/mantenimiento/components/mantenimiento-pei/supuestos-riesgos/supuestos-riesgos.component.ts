import { Component, OnInit } from '@angular/core';
import { SupuestosRiesgosService } from '../services/supuestos-riesgos.service';
import { alertRemoveSure, loading} from 'src/app/alerts/alerts';
import { SupuestosRiesgosI } from '../interfaces/supuestos-riesgos.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/appHelper.service';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PaginationI } from 'src/app/interfaces/Response.interfaces';

@Component({
  selector: 'app-resultado-efecto',
  templateUrl: './supuestos-riesgos.component.html',
  styleUrls: ['./supuestos-riesgos.component.css']
})
export class SupuestosRiegosComponent implements OnInit {

  page: number = 1
  pagination!: PaginationI
  supuestosRiesgos!: Array<SupuestosRiesgosI>;
  supuestoRiesgoForm: FormGroup;
  modulo = this.userSystemService.modulosSis
  
  constructor(
    public fb: FormBuilder,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private supuestosRiesgosService: SupuestosRiesgosService,
    private userSystemService: UserSystemInformationService,
  ) {
    this.supuestoRiesgoForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getAllSupuestosRiesgos();
  }

  getAllSupuestosRiesgos() {
    this.supuestosRiesgosService.getSupuestosRiesgos(this.page)
      .subscribe((resp: any) => { this.supuestosRiesgos = resp.data; this.pagination = resp.pagination;})
  }

  postSupuestoRiesgo() {
    this.supuestosRiesgosService.postSupuestosRiesgos(this.supuestoRiesgoForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllSupuestosRiesgos(), this.supuestoRiesgoForm) })
  }

  putSupuestoRiesgo() {
    this.supuestosRiesgosService.putSupuestosRiesgos(this.supuestoRiesgoForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllSupuestosRiesgos(), this.supuestoRiesgoForm) })
  }

  async deleteSupuestoRiesgo(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar el material de apoyo.")

    if (removeDecision) {
      loading(true)
      this.supuestosRiesgosService.deleteSupuestiRiesgos(id)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllSupuestosRiesgos(), this.supuestoRiesgoForm) })
    }
  }

  setValueEditSupuestoRiesgo(supuestoRiesgo: SupuestosRiesgosI) {
    this.supuestoRiesgoForm.reset(supuestoRiesgo)
  }
  
  saveChanges() {
    this.helperHandler.saveChanges(() => this.putSupuestoRiesgo(), this.supuestoRiesgoForm, () => this.postSupuestoRiesgo())
  }

  nextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page += 1
      this.getAllSupuestosRiesgos()
    }
  }
  previousPage() {
    if (this.page > 1) {
      this.page -= 1
      ;this.getAllSupuestosRiesgos()
    }
  }
}
