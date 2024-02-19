import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuarios.service';
import { alertIsSuccess, alertNoValidForm, alertRemoveSuccess, alertRemoveSure, alertServerDown, errorMessageAlert } from 'src/app/alerts/alerts';
import { UnidadOrganizativaService } from '../../services/unidad-organizativa.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { HelperService } from 'src/app/services/appHelper.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuariosForm: FormGroup;
  usuarios: any[] = []
  recintos: any[] = []
  cargos: any[] = []
  roles: any[] = []
  unidadesOrg: any[] = []
  
  constructor(
    public fb: FormBuilder,
    private apiUsuario: UsuarioService,
    private apiUnidadOrg: UnidadOrganizativaService,
    private userSystemService: UserSystemInformationService,
    private helperHandler: HelperService
  ) {
    this.usuariosForm = this.fb.group({
      id: 0,
      usuario: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      idRol: new FormControl('', Validators.required),
      idUnidad: new FormControl('', Validators.required),
      idCargo: new FormControl('', Validators.required),
      idRecinto: new FormControl('', Validators.required),
      idSistema: this.userSystemService.getSistema
    })
  }
  
  ngOnInit(): void {
    this.getAllRecintos()
    this.getAllCargos()
    this.getUsuarios()
    this.getAllRoles()
    this.getUnidadOrganizativa()
  }

  getUnidadOrganizativa() {
    this.apiUnidadOrg.getUnidadesOrganizativas()
      .subscribe((res: any) => { this.unidadesOrg = res.data })
  }

  getAllRecintos() {
    this.apiUsuario.getAllRecintos()
      .subscribe((res: any) => { this.recintos = res.data })
  }

  getAllRoles() {
    this.apiUsuario.getAllRoles()
      .subscribe((res: any) => { this.roles = res.data ; console.log(res);
      })
  }

  getAllCargos() {
    this.apiUsuario.getAllCargos()
      .subscribe((res: any) => { this.cargos = res.data })
  }

  getUsuarios() {
    this.apiUsuario.getUsuario()
      .subscribe((res: any) => { this.usuarios = res.data ; console.log(res)})
  }

  postUsuarios() {
    this.apiUsuario.postUsuario(this.usuariosForm.value)
      .subscribe((res: any) => {
        if (res.ok) {

          alertIsSuccess(true)
          this.getUsuarios()
          this.usuariosForm.reset()

        } else alertIsSuccess(false)
      })
  }

  putUsuarios() {
    this.apiUsuario.putUsuario(this.usuariosForm.value)
      .subscribe((res: any) => {
        if (res.ok) {

          alertIsSuccess(true)
          this.getUsuarios()
          this.usuariosForm.reset()

        } else alertIsSuccess(false)
      })
  }

  async deleteUsuarios(id: number) {
    let removeDecision: boolean = await alertRemoveSure("Estas seguro de eliminar el usuario.")

    if (removeDecision) {
      this.apiUsuario.removeUsuario(id)
        .subscribe((res: any) => {
          if (res.ok) {

            alertRemoveSuccess()
            this.getUsuarios()

          } else {
            errorMessageAlert('Ocurrio un error, No se pudo eliminar correctamente.')
          }
        })
    }
  }

  setValueEditUsuarios(usuarios: any) {
    this.usuariosForm.reset(usuarios)
  }

  saveChanges() {
    this.helperHandler.saveChanges(() => this.putUsuarios(), this.usuariosForm, () => this.postUsuarios())
  }
}
