import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuarios.service';
import { alertNoValidForm, alertRemoveSure, loading } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';
import { GetRolesI } from '../mantenimiento-pei/interfaces/RolesPermisos.interface';
import { PermissionService } from 'src/app/services/applyPermissions.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios!: any[]
  cargos: any[] = []
  recintos: any[] = []
  divisiones: any[] = []
  roles: GetRolesI[] = []
  unidadesOrg: any[] = []
  usuariosForm: FormGroup;
  departamentos: any[] = []

  constructor(
    public fb: FormBuilder,
    private apiUsuario: UsuarioService,
    private helperHandler: HelperService,
    public permisosCRUD: PermissionService,
    private userSystemService: UserSystemInformationService,
  ) {
    this.usuariosForm = this.fb.group({
      idUsuario: 0,
      idSistema: this.userSystemService.getSistema,
      idRol: new FormControl(0, Validators.required),
      nombre: new FormControl('', Validators.required),
      idCargo: new FormControl(0, Validators.required),
      usuario: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      idRecinto: new FormControl(0, Validators.required),
      idDivision: new FormControl(0, Validators.required),
      idDepartamento: new FormControl(0, Validators.required),
    })
  }

  ngOnInit(): void {
    this.getUsuarios()
    this.getAllRoles()
    this.getAllCargos()
    this.getDivisiones()
    this.getAllRecintos()
    this.getDepartamentos()
  }

  getDepartamentos() {
    this.apiUsuario.getAllDepartamento().subscribe((res: any) => { this.departamentos = res.data; })
  }

  getDivisiones() {
    this.apiUsuario.getAllDivisiones().subscribe((res: any) => { this.divisiones = res.data; })
  }

  getAllRecintos() {
    this.apiUsuario.getAllRecintos().subscribe((res: any) => { this.recintos = res.data; })
  }

  getAllRoles() {
    this.apiUsuario.getAllRoles().subscribe((res: any) => { this.roles = res.data; })
  }

  getAllCargos() {
    this.apiUsuario.getAllCargos().subscribe((res: any) => { this.cargos = res.data; })
  }

  getUsuarios() {
    this.apiUsuario.getUsuario().subscribe((res: any) => { this.usuarios = res.data; console.log(res.data);
     })
  }

  postUsuarios() {
    this.apiUsuario.postUsuario(this.usuariosForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponseGeneralServer(res, () => this.getUsuarios(), this.usuariosForm) })
  }

  putUsuarios() {
    this.apiUsuario.putUsuario(this.usuariosForm.value)
      .subscribe((res: any) => { this.helperHandler.handleResponseGeneralServer(res, () => this.getUsuarios(), this.usuariosForm) })
  }

  async deleteUsuarios(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar el usuario.")

    if (removeDecision) {
      loading(true)
      this.apiUsuario.removeUsuario(id)
        .subscribe((res: any) => { this.helperHandler.handleResponseGeneralServer(res, () => this.getUsuarios(), this.usuariosForm) })
    }
  }

  setValueEditUsuarios(usuario: any) {
    this.usuariosForm.patchValue({
      idUsuario: usuario.idUsuario,
      usuario: usuario.usuario,
      idRol: usuario.rol.idRol,
      apellidos: usuario.persona.apellidos,
      idRecinto: usuario.persona.recinto.idRecinto,
      nombre: usuario.persona.nombre,
      idCargo: usuario.persona.idCargo,
      idDivision: usuario.persona.division.id,
      idSistema: this.userSystemService.getSistema,
      idDepartamento: usuario.persona.idDepartamento,
    })
  }

  saveChanges() {
    console.log(JSON.stringify(this.usuariosForm.value));

    if (this.usuariosForm.valid) {
      if (this.usuariosForm.value.idUsuario > 0) this.putUsuarios()
      else this.postUsuarios()
    } else alertNoValidForm()
  }

}
