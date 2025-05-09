import { CanActivateFn, Router } from '@angular/router';

import {inject} from '@angular/core';

import { UserService } from './user.service';


export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  
  let mot = undefined;
  userService.getCurrentUser().subscribe(u => mot = u);
  if (mot != undefined) {
    return true;
  }
  return router.parseUrl('/');
};
