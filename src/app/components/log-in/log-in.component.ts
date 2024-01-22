import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router,
  ) {
    this.formUserLogIn = this.fb.group({
      usuario: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required),
    })
  }

  seePassword() {
    if (this.seePass == 'password') {
      this.seePass = 'text'
    } else {
      this.seePass = 'password'
    }
  }
}
