import { Component, OnInit } from '@angular/core';
import { EjesI } from '../interfaces/ejes.interface';
import { EjesService } from '../services/ejes.service';
import { alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { HelperService } from 'src/app/services/appHelper.service';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PaginationI } from 'src/app/interfaces/Response.interfaces';

@Component({
  selector: 'app-ejes',
  templateUrl: './ejes.component.html',
  styleUrls: ['./ejes.component.css']
})
export class EjesComponent implements OnInit {

  page: number = 1
  pagination!: PaginationI
  ejes!: Array<EjesI>;
  ejeForm: FormGroup;
  modulo = this.userSystemService.modulosSis

  constructor(
    private fb: FormBuilder,
    private ejesService: EjesService,
    public helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private userSystemService: UserSystemInformationService,
  ) {
    this.ejeForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      objetivo: new FormControl('', Validators.required),
      numeroEje: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.getAllEjes();
  }

  getAllEjes() {
    this.ejesService.getEjes(this.page)
      .subscribe((resp: any) => { this.ejes = resp.data; this.pagination = resp.pagination; })
  }

  postEjes() {
    this.ejesService.postEjes(this.ejeForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllEjes(), this.ejeForm) })
  }

  setValueEje(eje: EjesI) { this.ejeForm.reset(eje) }

  putEjes() {
    this.ejesService.updateEjes(this.ejeForm.value, this.ejeForm.value.id)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllEjes(), this.ejeForm) })
  }

  async deleteEjes(eje: EjesI) {
    let remove: boolean = await alertRemoveSure("¿Estas seguro de eliminar este eje?")
    if (remove) {
      loading(true)
      this.ejesService.DeleteEjes(eje.id!)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllEjes(), this.ejeForm) })
    }
  }

  saveChanges() {
    this.helperHandler.saveChanges(() => this.putEjes(), this.ejeForm, () => this.postEjes())
  }

  nextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page += 1
      this.getAllEjes()
    }
  }
  previousPage() {
    if (this.page > 1) {
      this.page -= 1
      ;this.getAllEjes()
    }
  }
}
