import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CosplanService } from '../services/cosplan.service';
import { catchError, map, of } from 'rxjs';

export const cosplanViewGuard: CanActivateFn = (route) => {
  const cosplanService = inject(CosplanService);
  const id = route.paramMap.get('id');

  if (!id) {
    cosplanService.cosplan.set(null);
    return true;
  }
  return cosplanService.loadCosplan$(+id).pipe(
    catchError((err) => {
      return of(false);
    }),
    map(() => true)
  );
};
