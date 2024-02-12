import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialApoyoService } from '../../services/material-apoyo.service';
import { alertIsSuccess, alertNoValidForm, alertRemoveSuccess, alertRemoveSure, errorMessageAlert } from 'src/app/alerts/alerts';
import { MaterialApoyoI } from '../../interfaces/mantenimientoPOA.interface';
import { ResponsesHandlerService } from 'src/app/services/responsesHandler.service';

@Component({
  selector: 'app-material-apoyo',
  templateUrl: './material-apoyo.component.html',
  styleUrls: ['./material-apoyo.component.css']
})
export class MaterialDeApoyoComponent implements OnInit {

  materialApoyoForm: FormGroup;
  materialesApoyo: MaterialApoyoI[] = []

  constructor(
    public fb: FormBuilder,
    private apiMaterial: MaterialApoyoService,
    private responseHandler: ResponsesHandlerService
  ) {
    this.materialApoyoForm = this.fb.group({
      id: 0,
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      enlace: new FormControl('', Validators.required),
      versionDocumento: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getMaterial()
  }

  getMaterial() {
    this.apiMaterial.getMaterialApoyo()
      .subscribe((res: any) => { this.materialesApoyo = res.data })
  }

  postMaterial() {
    this.apiMaterial.postMaterialApoyo(this.materialApoyoForm.value)
    .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getMaterial(), this.materialApoyoForm) })
  }

  putMaterial() {
    this.apiMaterial.putMaterialApoyo(this.materialApoyoForm.value)
    .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getMaterial(), this.materialApoyoForm) })
  }

  async deleteMaterial(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar el material de apoyo.")

    if (removeDecision) {
      this.apiMaterial.removeMaterialApoyo(id)
      .subscribe((res: any) => { this.responseHandler.handleResponse(res, () => this.getMaterial(), this.materialApoyoForm) })
    }
  }

  setValueEditMaterial(dataMaterial:any) {
      this.materialApoyoForm.reset(dataMaterial)
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
