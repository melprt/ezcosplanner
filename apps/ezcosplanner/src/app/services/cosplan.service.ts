import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { CosplanApiService } from './cosplan-api.service';
import { Cosplan } from '../models/cosplan';
import { catchError, Observable, of, tap } from 'rxjs';
import { ViewMode } from '../types/view-mode';

@Injectable()
export class CosplanService {
  cosplan = signal<Cosplan | null | undefined>(undefined);
  viewMode: Signal<ViewMode> = computed(() => this.computeViewMode(this.cosplan()));

  private cosplanApiService = inject(CosplanApiService);

  loadCosplan$(cosplanId: number): Observable<Cosplan | null> {
    if (cosplanId) {
      return this.cosplanApiService.getCosplanbyId$(+cosplanId).pipe(
        catchError((err) => {
          const error = `Error while initial loading cosplan: ${err}`;
          console.error(error);
          throw new Error(error);
        }),
        tap((res) => {
          this.cosplan.set(res);
        })
      );
    }
    this.cosplan.set(null);
    return of(null);
  }


  computeViewMode(cosplan: Cosplan | null | undefined): ViewMode {
    if (cosplan) {
      return 'EDIT';
    }
    if (cosplan === null) {
      return 'CREATE';
    }

    return 'LOADING';
  }
}
