import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PresupuestoInstitucionalService } from '../../services/presupuestoInstitucional.service';
import { loading } from 'src/app/alerts/alerts';
import { format } from 'date-fns';
import { HelperService } from 'src/app/services/appHelper.service';
import { PresupuestoInstiGetI } from '../../interfaces/mantenimientoPOA.interface';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PaginationI } from 'src/app/interfaces/Response.interfaces';

@Component({
  selector: 'app-presupuesto-institucional',
  templateUrl: './presupuesto-institucional.component.html',
  styleUrls: ['./presupuesto-institucional.component.css']
})
export class PresupuestoInstitucionalComponent implements OnInit {

  page: number = 1
  pagination!: PaginationI
  presupuestoInstiForm: FormGroup;
  presupuestosInst!: PresupuestoInstiGetI[]
  modulo = this.userSystemService.modulosSis
  
  constructor(
    public fb: FormBuilder,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private userSystemService: UserSystemInformationService,
    private apiPresupuestoInstitucional: PresupuestoInstitucionalService,
  ) {
    this.presupuestoInstiForm = this.fb.group({
      id: 0,
      justicarModificacion: new FormControl(''),
      fechaFin: new FormControl('', Validators.required),
      montoTotal: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getPresupuestoInstitucional()
  }

  getPresupuestoInstitucional() {
    this.apiPresupuestoInstitucional.getPresupuestoInstitucional(this.page)
      .subscribe((res: any) => { this.presupuestosInst = res.data; this.pagination = res.pagination;})
  }

  putUnidadOrganizativa() {
    this.apiPresupuestoInstitucional.putPresupuestoInstitucional(this.presupuestoInstiForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getPresupuestoInstitucional(), this.presupuestoInstiForm) })
  }

  postUnidadOrganizativa() {
    this.apiPresupuestoInstitucional.postPresupuestoInstitucional(this.presupuestoInstiForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getPresupuestoInstitucional(), this.presupuestoInstiForm) })
  }

  postActivarPresupuesto(presupuesto: number) {
    loading(true)
    this.apiPresupuestoInstitucional.postActivarPresupuesto(presupuesto)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getPresupuestoInstitucional(), this.presupuestoInstiForm) })
  }

  setValueEditPreInst(presupuestoInstiForm: any) {
    this.presupuestoInstiForm.reset(presupuestoInstiForm)
  }

  saveChanges() {
    this.presupuestoInstiForm.value.fechaFin = format(this.presupuestoInstiForm.value.fechaFin, 'yyyy-MM-dd');
    this.presupuestoInstiForm.value.fechaInicio = format(this.presupuestoInstiForm.value.fechaInicio, 'yyyy-MM-dd');
    
    this.helperHandler.saveChanges(() => this.putUnidadOrganizativa(), this.presupuestoInstiForm, () => this.postUnidadOrganizativa())
  }

  nextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page += 1
      this.getPresupuestoInstitucional()
    }
  }
  previousPage() {
    if (this.page > 1) {
      this.page -= 1
      ;this.getPresupuestoInstitucional()
    }
  }
}
