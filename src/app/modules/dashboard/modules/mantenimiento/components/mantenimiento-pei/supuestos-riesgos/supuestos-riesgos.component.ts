import { Component, OnInit } from '@angular/core';
import { SupuestosRiesgosService } from '../services/supuestos-riesgos.service';
import { alertRemoveSure, loading} from 'src/app/alerts/alerts';
import { SupuestosRiesgosI } from '../interfaces/supuestos-riesgos.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/appHelper.service';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Component({
  selector: 'app-resultado-efecto',
  templateUrl: './supuestos-riesgos.component.html',
  styleUrls: ['./supuestos-riesgos.component.css']
})
export class SupuestosRiegosComponent implements OnInit {

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
    this.supuestosRiesgosService.getSupuestosRiesgos()
      .subscribe((resp: any) => { this.supuestosRiesgos = resp.data;})
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
}
