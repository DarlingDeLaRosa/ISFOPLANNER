import { Component, OnInit } from '@angular/core';
import { alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { HelperService } from 'src/app/services/appHelper.service';
import { RequerimientoI } from '../interfaces/requerimientos.interface';
import { RequerimientosService } from '../services/requerimientos.service';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-estructura-programatica',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})
export class RequerimientosComponent implements OnInit {

  requerimientoForm: FormGroup;
  requerimientos!: Array<RequerimientoI>;

  constructor(
    private fb: FormBuilder,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private requerimientoService: RequerimientosService,
  ) {
    this.requerimientoForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      esFinanciero: new FormControl(null, Validators.required),
    })
  }

  ngOnInit(): void {
    this.getAllRequerimientos();
  }

  getAllRequerimientos() {
    this.requerimientoService.getRequerimientos()
      .subscribe((resp: any) => { this.requerimientos = resp.data; console.log(resp); })
  }

  postRequerimiento() {
    this.requerimientoService.postRequerimientos(this.requerimientoForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllRequerimientos(), this.requerimientoForm) })
  }

  putRequerimiento() {
    this.requerimientoService.putRequerimientos(this.requerimientoForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllRequerimientos(), this.requerimientoForm) })
  }

  async deleteRequerimiento(requerimientos: number) {
    let removeDesicion: boolean = await alertRemoveSure("Estas seguro de eliminar este requerimiento?")

    if (removeDesicion) {
      loading(true)
      this.requerimientoService.deleteRequerimientos(requerimientos)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllRequerimientos(), this.requerimientoForm) })
    }
  }

  setValueRequerimiento(requerimiento: RequerimientoI) {
    this.requerimientoForm.reset(requerimiento)
  }

  saveChanges() {
    this.helperHandler.saveChanges(() => this.putRequerimiento(), this.requerimientoForm, () => this.postRequerimiento())
  }
}





