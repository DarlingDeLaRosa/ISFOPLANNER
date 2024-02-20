import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GetRolesI, Getmodulos, modulo } from '../mantenimiento-pei/interfaces/RolesPermisos.interface';
import { HelperService } from 'src/app/services/appHelper.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { RolesPermisosService } from '../../services/roles.service';
import { MatDialog } from '@angular/material/dialog';
import { modulosService } from '../../services/modulos.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  modulos: modulo[] = [];;
  rolesForm: FormGroup;
  roles: Array<GetRolesI> = [];

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

    console.log(this.rolesForm.value);

    //[
    //   {
    //     idModulo: 0,
    //     crear: new FormControl('', Validators.required),
    //     editar: new FormControl('', Validators.required),
    //     eliminar: new FormControl('', Validators.required),
    //   }
    // ]
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
    this.rolesPermisosService.getRolesPermisos()
      .subscribe((resp: any) => {
        this.roles = resp.data;

        // resp.data[0].modulos.map((modulo: modulos) => {

        //   const permisoGroup = this.fb.group({
        //     idModulo: modulo.idModulo,
        //     crear: new FormControl(modulo.permiso.crear, Validators.required),
        //     editar: new FormControl(modulo.permiso.editar, Validators.required),
        //     eliminar: new FormControl(modulo.permiso.eliminar, Validators.required),
        //   });

        //   (this.rolesForm.get('permisos') as FormArray).push(permisoGroup)
        // })
      })

  }

  setValueRolesPermisos() {
    console.log(this.rolesForm.value);
  }

  deleteRolesPermisos() {

  }

  openModal(rol: GetRolesI) {
    // this.dialog.open(EntidadListViewComponent, { data: producto })
  }

  saveChanges() {
    // this.helperHandler.saveChanges(() => this.putSupuestoRiesgo(), this.supuestoRiesgoForm, () => this.postSupuestoRiesgo())
  }
}
