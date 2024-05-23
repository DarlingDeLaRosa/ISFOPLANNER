import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { alertPeriod, alertPeriodDone } from 'src/app/alerts/alerts';
import { UserSystemInformationService } from 'src/app/services/user-system-information.service';
import { periodoConfig } from '../modules/mantenimiento/interfaces/mantenimientoPOA.interface';
import { ConfiguracionPeriodoServive } from '../modules/mantenimiento/services/configuracion-periodos.service';
import { map, catchError, of } from 'rxjs';

export const formulacionPeriodoGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router)
  const periodoService = inject(ConfiguracionPeriodoServive)
  
  return periodoService.getPeriodoConfig().pipe(
    map((res: any) => {
      const formulacion = res.data.find((period: any) => period.tipoProceso.nombre === 'Formulación');
      
      if (!formulacion) {
        alertPeriod(
          "El administrador aun no establece periodo de formulación / Planes transversales",
          "Para mas información comuniquese con el Departamento de Formulación, Monitoreo y Evaluación de Planes, Programas y Proyectos"
        );
        router.navigate(['dashboard/ayuda']);
        return false;
      }

      const { fechaFin, fechaInicio, prorroga } = formulacion;
      const currentDate = new Date();

      if (currentDate > new Date(fechaInicio) && currentDate < new Date(fechaFin)) {
        return true;
      }

      if (prorroga && currentDate <= new Date(prorroga)) {
        alertPeriod("Periodo de Prórroga", `Finaliza ${prorroga} (DD/MM/AA)`);
        return true;
      } else {
        alertPeriodDone(
          "La fecha límite de formulación ha expirado",
          "Para mas información comuniquese con el Departamento de Formulación, Monitoreo y Evaluación de Planes, Programas y Proyectos"
        );
        router.navigate(['dashboard/ayuda']);
        return false;
      }
    }),
    catchError(error => {
      // Manejar el error y posiblemente redirigir
      console.error('Error fetching periodo config:', error);
      router.navigate(['dashboard/ayuda']);
      return of(false);
    })
  );
};


  // if (sistemInformation.getPeriod.formulacion == undefined) {
  //   alertPeriod("El administrador aun no establece periodo de formulación / Planes transversales",`Para mas información comuniquese con el Departamento de Formulación, Monitoreo y Evaluación de Planes, Programas y Proyectos `)
  //   router.navigate(['dashboard/ayuda'])
  // }

  // const {fechaFin, fechaInicio, prorroga} = sistemInformation.getPeriod.formulacion
  // const currentDate = new Date() 

  // if (currentDate > new Date(fechaInicio) && currentDate < new Date(fechaFin)){
  //   return true
  // }
  
  // if(prorroga != null && currentDate <= new Date(prorroga)){
  //   alertPeriod("Periodo de Prórroga",`Finaliza ${prorroga}`)
  //   return true

  // }else {
  //   alertPeriodDone("La fecha límite de formulación ha expirado", "Para mas información comuniquese con el Departamento de Formulación, Monitoreo y Evaluación de Planes, Programas y Proyectos ")
  //   router.navigate(['dashboard/ayuda']) 
  //   return false
  // }

// const monitoreo = sistemInformation.getPeriod.monitoreo
