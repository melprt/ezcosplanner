import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { CosplanService } from '../../../services/cosplan.service';
import { ViewMode } from '../../../types/view-mode';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Cosplan } from '../../../models/cosplan';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'ezc-cosplan-dashboard-top-bar',
  standalone: true,
  imports: [CommonModule, MatToolbar, MatIcon],
  templateUrl: './cosplan-dashboard-top-bar.component.html',
  styleUrl: './cosplan-dashboard-top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosplanDashboardTopBarComponent {
  private id = inject(ActivatedRoute).snapshot.paramMap.get('id');
  private cosplanService = inject(CosplanService);

  cosplan = toSignal(this.retrieveExistingCosplan());
  cosplanStatus = computed(() => this.cosplan()?.status);

  viewMode: Signal<ViewMode> = computed(() => this.computeViewMode(this.cosplan()));

  private retrieveExistingCosplan(): Observable<Cosplan | null> {
    if (!this.id) {
      return of(null);
    }

    return this.cosplanService.getCosplanbyId$(+this.id);
  }

  private computeViewMode(cosplan: Cosplan | null | undefined): ViewMode {
    if (cosplan) {
      return 'EDIT';
    }
    if (cosplan === null) {
      return 'CREATE';
    }

    return 'LOADING';
  }
}
