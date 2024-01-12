import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialApoyoService } from '../../services/material-apoyo.service';
import { catchError, throwError } from 'rxjs';
import { alertIsSuccess, alertNoValidForm, alertRemoveSuccess, alertRemoveSure, alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UnidadOrganizativaService } from '../../services/unidad-organizativa.service';

@Component({
  selector: 'app-material-apoyo',
  templateUrl: './material-apoyo.component.html',
  styleUrls: ['./material-apoyo.component.css']
})
export class MaterialDeApoyoComponent implements OnInit {

  materialApoyoForm: FormGroup;
  materialesApoyo: any[] = []
  unidadesOrg: any[] = []

  constructor(
    public fb: FormBuilder,
    private apiMaterial: MaterialApoyoService,
    private apiUnidadOrg: UnidadOrganizativaService
  ) {
    this.materialApoyoForm = this.fb.group({
      id: 0,
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      enlace: new FormControl('', Validators.required),
      versionDocumento: new FormControl('', Validators.required),
      idUnidadOrganizativa: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.getMaterial()
    this.getUnidadOrganizativa()
  }

  getUnidadOrganizativa() {
    this.apiUnidadOrg.getUnidadesOrganizativas()
      .subscribe((res: any) => { this.unidadesOrg = res.data })
  }

  getMaterial() {
    this.apiMaterial.getMaterialApoyo()
      .subscribe((res: any) => { this.materialesApoyo = res.data })
  }

  postMaterial() {
    this.apiMaterial.postMaterialApoyo(this.materialApoyoForm.value)
      .subscribe((res: any) => {
        if (res.data != null) {

          alertIsSuccess(true)
          this.getMaterial()
          this.materialApoyoForm.reset()

        } else alertIsSuccess(false)
      })
  }

  putMaterial() {
    this.apiMaterial.putMaterialApoyo(this.materialApoyoForm.value)
      .subscribe((res: any) => {
        if (res.data != null) {

          alertIsSuccess(true)
          this.getMaterial()
          this.materialApoyoForm.reset()

        } else alertIsSuccess(false)
      })
  }

  async deleteMaterial(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar el material de apoyo.")

    if (removeDecision) {
      this.apiMaterial.removeMaterialApoyo(id)
        .subscribe((res: any) => {
          if (res.ok) {
            alertRemoveSuccess()
            this.getMaterial()
          } else {
            errorMessageAlert('Ocurrio un error, No se pudo eliminar correctamente.')
          }
        })
    }
  }

  setValueEditMaterial(dataMaterial:any) {
    if (dataMaterial.unidadOrganizativa != null) {
      this.materialApoyoForm.reset(dataMaterial)
      this.materialApoyoForm.patchValue({ idUnidadOrganizativa: dataMaterial.unidadOrganizativa.id })
    }
  }

  saveChangesButton() {
    if(this.materialApoyoForm.valid){
      if (this.materialApoyoForm.value.id > 0) this.putMaterial()
      else this.postMaterial()
    }else{
      alertNoValidForm()
    }
  }

}
