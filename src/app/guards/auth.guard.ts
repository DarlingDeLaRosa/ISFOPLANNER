import { CanActivateFn, Router } from '@angular/router';
import { UserSystemInformationService } from '../services/user-system-information.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const auth = inject(UserSystemInformationService)

  if(auth.getDataLocalStorage("token") != undefined) return true
  else {
    router.navigate(['/login'])
    return false
  }
};

export const authGuardBackToLogIn: CanActivateFn = (route, state) => {
  const auth = inject(UserSystemInformationService)
  const router = inject(Router)
  
  if(auth.getDataLocalStorage("token") != undefined) {
    router.navigate(['/dashboard/ayuda'])
    return false
  }
  else return true
};