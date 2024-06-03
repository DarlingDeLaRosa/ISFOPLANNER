import { Component, OnInit } from '@angular/core';
import { alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { HelperService } from 'src/app/services/appHelper.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstructuraProgramaticaService } from '../../services/estructura-programatica.service';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PaginationI } from 'src/app/interfaces/Response.interfaces';


@Component({
  selector: 'app-estructura-programatica',
  templateUrl: './estructura-programatica.component.html',
  styleUrls: ['./estructura-programatica.component.css']
})
export class EstructuraProgramaticaComponent implements OnInit {

  page: number = 1
  pagination!: PaginationI
  estructuraProgramaticaForm: FormGroup;
  estructurasProgramaticas!: any[]
  modulo = this.userSystemService.modulosSis

  constructor(
    public fb: FormBuilder,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private userSystemService: UserSystemInformationService,
    private apiEstructuraPro: EstructuraProgramaticaService,
  ) {
    this.estructuraProgramaticaForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.getEstructuraPro()
  }

  getEstructuraPro() {
    this.apiEstructuraPro.getEstructurasProgramaticas(this.page)
      .subscribe((res: any) => { this.estructurasProgramaticas = res.data; this.pagination = res.pagination; })
  }

  postEstructuraPro() {
    this.apiEstructuraPro.postEstructurasProgramaticas(this.estructuraProgramaticaForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getEstructuraPro(), this.estructuraProgramaticaForm) })
  }

  putEstructuraPro() {
    this.apiEstructuraPro.putEstructurasProgramaticas(this.estructuraProgramaticaForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getEstructuraPro(), this.estructuraProgramaticaForm) })
  }

  async deleteEstructuraPro(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar la estructura programatica.")

    if (removeDecision) {
      loading(true)
      this.apiEstructuraPro.removeEstructurasProgramaticas(id)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getEstructuraPro(), this.estructuraProgramaticaForm) })
    }
  }

  setValueEditEstructuraPro(estructuraPro: any) {
    this.estructuraProgramaticaForm.reset(estructuraPro)
  }

  saveChanges() {
    this.helperHandler.saveChanges(() => this.putEstructuraPro(), this.estructuraProgramaticaForm, () => this.postEstructuraPro())
  }

  nextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page += 1
      this.getEstructuraPro()
    }
  }
  previousPage() {
    if (this.page > 1) {
      this.page -= 1
      ;this.getEstructuraPro()
    }
  }
}
