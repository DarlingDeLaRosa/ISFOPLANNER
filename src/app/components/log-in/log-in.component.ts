import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMessageAlert } from 'src/app/alerts/alerts';
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
    public fb: FormBuilder,
    private userSystemService: UserSystemInformationService,
    private authService: AuthenticationService,
    private router: Router,
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
    this.authService.postLogIn(this.formUserLogIn.value)
      .subscribe((res: any) => {
        
        console.log(res);
        if (res.data != undefined) {

          this.userSystemService.saveDataLocalStorage("user",res.data)  
          this.userSystemService.saveDataLocalStorage("token", `Bearer${res.token}`)
            
          this.userSystemService.setUserToken = `Bearer${res.token}`
          this.userSystemService.setUserLogged = res.data

          this.router.navigate(['/dashboard/panelDeControl'])
        
        } else errorMessageAlert(res.message)

      })
  }
}
