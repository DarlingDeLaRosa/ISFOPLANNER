import { Component, Inject, OnInit } from '@angular/core';
import { PreguntaI } from '../../../mantenimiento/interfaces/mantenimientoPOA.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-asnwer-view',
  templateUrl: './asnwer-view.component.html',
  styleUrls: ['./asnwer-view.component.css']
})
export class AsnwerViewComponent implements OnInit{
  
  sanitizedContent!: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public pregunta_Asnwer: PreguntaI,
  ){
  }

  ngOnInit(): void {
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.pregunta_Asnwer.respuesta);
  }
  
}
