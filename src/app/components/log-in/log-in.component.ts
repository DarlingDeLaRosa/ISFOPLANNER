import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessageAlert, loading } from 'src/app/alerts/alerts';
import { AuthenticationService } from 'src/app/services/auth.service';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  formUserLogIn: FormGroup;
  seePass: string = 'password'

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private userSystemService: UserSystemInformationService,
  ) {
    this.formUserLogIn = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      idSistema: this.userSystemService.getSistema
    })
  }

  togglePasswordVisibility() {
    this.seePass = (this.seePass === 'password') ? 'text' : 'password'
  }

  logIn() {
    loading(true)
    this.authService.postLogIn(this.formUserLogIn.value)
      .subscribe((res: any) => {
        console.log(res);
        
        loading(false)
        
        if (res.data != undefined) {
          this.userSystemService.saveDataLocalStorage("userData", res.data)
          this.userSystemService.saveDataLocalStorage("token", res.token)

          this.userSystemService.setUserToken = res.token
          this.userSystemService.setUserLogged = res.data

          this.router.navigate(['/dashboard/ayuda'])

        } else errorMessageAlert(res.message)

      })
  }
}
