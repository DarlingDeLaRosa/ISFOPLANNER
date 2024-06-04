import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GetRolesI, modulo } from '../mantenimiento-pei/interfaces/RolesPermisos.interface';
import { HelperService } from 'src/app/services/appHelper.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { RolesPermisosService } from '../../services/roles.service';
import { MatDialog } from '@angular/material/dialog';
import { modulosService } from '../../services/modulos.service';
import { RolesViewComponent } from '../../modals/roles-view/roles-view.component';
import { alertNoValidForm, alertRemoveSure, loading } from 'src/app/alerts/alerts';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  modulos: modulo[] = [];;
  rolesForm: FormGroup;
  roles!: Array<GetRolesI>;
  
  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    public moduloService: modulosService,
    private helperHandler: HelperService,
    private rolesPermisosService: RolesPermisosService,
    private userSystemService: UserSystemInformationService,
  ) {
    this.rolesForm = this.fb.group({
      idRol: 0,
      rolName: new FormControl('', Validators.required),
      idSistema: this.userSystemService.getSistema,
      permisos: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.getModulos()
    this.getRolesPermisos()
  }

  getModulos() {
    this.moduloService.getModulosByIdSistema()
      .subscribe((resp: any) => {
        resp.data.map((modulo: modulo) => {

          const permisoGroup = this.fb.group({
            idPermiso: 0,
            idModulo: modulo.idModulo,
            leer: new FormControl(false, Validators.required),
            crear: new FormControl(false, Validators.required),
            editar: new FormControl(false, Validators.required),
            eliminar: new FormControl(false, Validators.required),
          });

          (this.rolesForm.get('permisos') as FormArray).push(permisoGroup)
        })
      })

  }

  getRolesPermisos() {
    this.rolesPermisosService.getRolesPermisos().subscribe((resp: any) => { this.roles = resp.data; })
  }

  postRolesPermisos() {
    this.rolesPermisosService.postRolesPermisos(this.rolesForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponseGeneralServer(res, () => this.getRolesPermisos(), this.rolesForm) })
  }

  putRolesPermisos() {
    this.rolesPermisosService.postRolesPermisos(this.rolesForm.value)
      .subscribe((res: any) => { 
        this.helperHandler.handleResponseGeneralServer(res, () => this.getRolesPermisos(), this.rolesForm,) })
  }

  setValueRolesPermisos(rol: GetRolesI) {
    const permisosArray = this.rolesForm.get('permisos') as FormArray;

    this.rolesForm.patchValue({
      idRol: rol.idRol,
      rolName: rol.nombre,
    })

    this.rolesForm.patchValue({
      permisos: rol.modulos.map((permiso, index) => {
        const permisoGroup = permisosArray.at(index);
        permisoGroup.patchValue({
          idPermiso: permiso.permiso.idPermiso,
          idModulo: permiso.idModulo,
          leer: permiso.permiso.leer,
          idSistema: this.userSystemService.getSistema,
          crear: permiso.permiso.crear,
          editar: permiso.permiso.editar,
          eliminar: permiso.permiso.eliminar,
        })
      })
    })
  }

  async deleteRolesPermisos(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar el rol.")

    if (removeDecision) {
      loading(true)
      this.rolesPermisosService.removeRolesPermisos(id)
        .subscribe((res: any) => { this.helperHandler.handleResponseGeneralServer(res, () => this.getRolesPermisos(), this.rolesForm) })
    }
  }

  openModal(rol: GetRolesI) {
    this.dialog.open(RolesViewComponent, { data: rol })
  }

  saveChanges() {
    if (this.rolesForm.valid) {
      if (this.rolesForm.value.idRol > 0) this.putRolesPermisos()
      else this.postRolesPermisos()
    } else alertNoValidForm()
  }

}
