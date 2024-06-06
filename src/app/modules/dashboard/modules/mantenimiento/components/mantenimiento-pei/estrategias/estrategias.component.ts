import { Component, OnInit } from '@angular/core';
import { EstrategiasService } from '../services/estrategias.service';
import { EstrategiaI } from '../interfaces/estrategias.interface';
import { EjesService } from '../services/ejes.service';
import { EjesI } from '../interfaces/ejes.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { HelperService } from 'src/app/services/appHelper.service';
import { PermissionService } from 'src/app/services/applyPermissions.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { PaginationI } from 'src/app/interfaces/Response.interfaces';

@Component({
  selector: 'app-estrategias',
  templateUrl: './estrategias.component.html',
  styleUrls: ['./estrategias.component.css']
})
export class EstrategiasComponent implements OnInit {

  page: number = 1
  pagination!: PaginationI
  ejes: Array<EjesI> = [];
  estrategiaForm: FormGroup;
  estrategias!: Array<EstrategiaI>;
  modulo = this.userSystemService.modulosSis

  constructor(
    private fb: FormBuilder,
    private ejesService: EjesService,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private estrategiasService: EstrategiasService,
    private userSystemService: UserSystemInformationService,
  ) {
    this.estrategiaForm = this.fb.group({
      id: 0,
      nombre: new FormControl('', Validators.required),
      idEjeEstrategico: new FormControl<number>(0, Validators.required),
    })
  }

  ngOnInit(): void {
    this.getAllEjes();
    this.getAllEstrategia();
  }

  getAllEjes() {
    this.ejesService.getEjes(1, 100)
      .subscribe((resp: any) => { this.ejes = resp.data; })
  }

  getAllEstrategia() {
    this.estrategiasService.getEstrategias(this.page)
      .subscribe((resp: any) => { this.estrategias = resp.data; this.pagination = resp.pagination; })
  }

  postEstrategia() {
    this.estrategiasService.postEstrategias(this.estrategiaForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllEstrategia(), this.estrategiaForm) })
  }

  setValueEstrategia(estrategia: EstrategiaI) {
    this.estrategiaForm.setValue({
      id: estrategia.id,
      nombre: estrategia.nombre,
      idEjeEstrategico: estrategia.ejeEstrategico.id
    });
  }

  putEstrategia() {
    this.estrategiasService.updateEstrategias(this.estrategiaForm.value, this.estrategiaForm.value.id)
      .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllEstrategia(), this.estrategiaForm) })
  }

  async deleteEstrategia(estrategiaId: number) {
    let removeDesicion: boolean = await alertRemoveSure("¿Estas seguro de eliminar esta estrategia?")

    if (removeDesicion) {
      loading(true)
      this.estrategiasService.DeleteEstrategias(estrategiaId)
        .subscribe((res: any) => { this.helperHandler.handleResponse(res, () => this.getAllEstrategia(), this.estrategiaForm) })
    }
  }

  saveChanges() {
    this.helperHandler.saveChanges(() => this.putEstrategia(), this.estrategiaForm, () => this.postEstrategia())
  }

  nextPage() {
    if (this.page < this.pagination.totalPages) {
      this.page += 1
      this.getAllEstrategia()
    }
  }
  previousPage() {
    if (this.page > 1) {
      this.page -= 1
      ;this.getAllEstrategia()
    }
  }
}
