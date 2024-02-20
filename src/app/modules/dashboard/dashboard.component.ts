import { Component, OnInit } from '@angular/core';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Component({
  selector: 'dash-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class dashboardComponent implements OnInit{
  sidenavOpened: boolean = false;
  userLogged: any = this.userSystemService.getUserLogged

  constructor(
    private userSystemService: UserSystemInformationService,
  ){}
  
  ngOnInit(): void {
  }
}
