import { Component, OnInit } from '@angular/core';
import { UserSystemInformationService } from './services/user-system-information.service';
import { UserI } from './interfaces/Response.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'isfoPlanner';
  userData: string | null
  token: string | null

  constructor(
    private userSystemService: UserSystemInformationService,
  ){
    this.userData = localStorage.getItem('userData')
    this.token = localStorage.getItem('token')
  }

  ngOnInit(): void {
    
    if(this.userData != null) {
      let userDataParse: UserI = JSON.parse(this.userData)
      this.userSystemService.setUserLogged = userDataParse
    }

    if(this.token != null) {
      this.userSystemService.setUserToken = this.token
    }
  }
}
