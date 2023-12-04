import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  const token = authService.token

  if (state.url.includes('login') && token) {
    return router.navigateByUrl('/ailments')
  } else if (!state.url.includes('login') && state.url !== '/' && !token) {
    return router.navigateByUrl('/login')
  }

  return true
}
