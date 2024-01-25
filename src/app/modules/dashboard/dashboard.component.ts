import { Component, OnInit } from '@angular/core';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

@Component({
  selector: 'dash-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class dashboardComponent implements OnInit{
  sidenavOpened: boolean = false;
  //crear las variables para esconder planes tranversales y mantenimiento 

  constructor(
    private userSystemService: UserSystemInformationService,
  ){}
  
  ngOnInit(): void {
    
  }
}
