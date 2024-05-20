import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { alertPeriod, alertPeriodDone } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';

export const formulacionPeriodoGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router)
  const sistemInformation = inject(UserSystemInformationService)
  
  if (sistemInformation.getPeriod.formulacion == undefined) {
    alertPeriod("El administrador aun no establece periodo de formulación / Planes transversales",`Para mas información comuniquese con el Departamento de Formulación, Monitoreo y Evaluación de Planes, Programas y Proyectos `)
    router.navigate(['dashboard/ayuda'])
  }

  const {fechaFin, fechaInicio, prorroga} = sistemInformation.getPeriod.formulacion
  const currentDate = new Date() 

  if (currentDate > new Date(fechaInicio) && currentDate < new Date(fechaFin)){
    return true
  }
  
  if(prorroga != null && currentDate <= new Date(prorroga)){
    alertPeriod("Periodo de Prórroga",`Finaliza ${prorroga}`)
    return true

  }else {
    alertPeriodDone("La fecha límite de formulación ha expirado", "Para mas información comuniquese con el Departamento de Formulación, Monitoreo y Evaluación de Planes, Programas y Proyectos ")
    router.navigate(['dashboard/ayuda']) 
    return false
  }
};

// const monitoreo = sistemInformation.getPeriod.monitoreo
