import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from '../../shared/services/common/common.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const commonService = inject(CommonService);

  const getUserDataAndNavigate = () => {
    const { user } = commonService.getCurrentUserData();
    router.navigate([user && user?.userLevel === "SUPERADMINUSER" ? '/master-data' : '/dashboard']);
    return user;
  }

  const loggedUser = sessionStorage.getItem('data');
  if(loggedUser) {
      getUserDataAndNavigate()
    return false;
  } else { 
    return true;
  }

};
