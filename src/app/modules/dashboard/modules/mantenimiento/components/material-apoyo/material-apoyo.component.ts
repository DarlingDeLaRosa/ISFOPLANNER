import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialApoyoService } from '../../services/material-apoyo.service';
import { alertIsSuccess, alertNoValidForm, alertRemoveSuccess, alertRemoveSure, errorMessageAlert } from 'src/app/alerts/alerts';
import { MaterialApoyoI } from '../../interfaces/mantenimientoPOA.interface';
import { HelperService } from 'src/app/services/appHelper.service';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Component({
  selector: 'app-material-apoyo',
  templateUrl: './material-apoyo.component.html',
  styleUrls: ['./material-apoyo.component.css']
})
export class MaterialDeApoyoComponent implements OnInit {

  materialApoyoForm: FormGroup;
  materialesApoyo!: MaterialApoyoI[]
  modulo = this.userSystemService.modulosSis
  
  constructor(
    public fb: FormBuilder,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private apiMaterial: MaterialApoyoService,    
    private userSystemService: UserSystemInformationService,
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
    .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getMaterial(), this.materialApoyoForm) })
  }

  putMaterial() {
    this.apiMaterial.putMaterialApoyo(this.materialApoyoForm.value)
    .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getMaterial(), this.materialApoyoForm) })  
  }

  async deleteMaterial(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar el material de apoyo.")

    if (removeDecision) {
      this.apiMaterial.removeMaterialApoyo(id)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getMaterial(), this.materialApoyoForm) })
    }
  }

  setValueEditMaterial(dataMaterial:any) {
      this.materialApoyoForm.reset(dataMaterial)
  }
  
  saveChanges() {
    this.helperHandler.saveChanges(() => this.putMaterial(), this.materialApoyoForm, () => this.postMaterial())
  }

}
