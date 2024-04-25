import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { alertPeriod, alertPeriodDone } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

export const formulacionPeriodoGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const sistemInformation = inject(UserSystemInformationService)

  const {fechaFin, fechaInicio, prorroga} = sistemInformation.getPeriod.formulacion
  const currentDate = new Date()
  
  console.log(fechaFin, fechaInicio, prorroga);
  console.log(currentDate);
  
  if (new Date(fechaInicio) >= currentDate && new Date(fechaFin) <= currentDate) {
    return true;

  }else if(prorroga != null && new Date(prorroga) >= currentDate){
    alertPeriod("Periodo de Prórroga",`Finaliza ${prorroga}`)
    return true

  }else {
    alertPeriodDone("La fecha límite de formulación ha expirado", "Para mas información comuniquese con el Departamento de Formulación, Monitoreo y Evaluación de Planes, Programas y Proyectos ")
    router.navigate(['dashboard/ayuda']) 
    return false
  }
};


// const monitoreo = sistemInformation.getPeriod.monitoreo
