import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { CosplanApiService } from './cosplan-api.service';
import { Cosplan } from '../models/cosplan';
import { catchError, Observable, of, tap } from 'rxjs';
import { ViewMode } from '../types/view-mode';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CosplanForm } from '../types/cosplan-form';
import { InferedFormGroup } from '../utils/form.utils';

@Injectable()
export class CosplanService {
  cosplan = signal<Cosplan | null | undefined>(undefined);
  viewMode: Signal<ViewMode> = computed(() =>
    this.computeViewMode(this.cosplan())
  );

  private cosplanApiService = inject(CosplanApiService);

  loadCosplan$(cosplanId: number | undefined): Observable<Cosplan | null> {
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

  refreshCosplan$(): Observable<Cosplan | null> {
    return this.loadCosplan$(this.cosplan()?.id)
  }

  getCosplanForm(): FormGroup<InferedFormGroup<CosplanForm>> {
    const form = new FormGroup<InferedFormGroup<CosplanForm>>({
      name: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      fandom: new FormControl('', {
        validators: Validators.required,
        nonNullable: true,
      }),
      category: new FormControl('OTHER', {
        validators: Validators.required,
        nonNullable: true,
      }),
    });
    return form;
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
