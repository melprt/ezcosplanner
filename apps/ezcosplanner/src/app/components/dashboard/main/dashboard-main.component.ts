import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CosplanService } from '../../../services/cosplan.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressCircleComponent } from '../../progess-circle/progress-circle.component';
import { TimeEntriesStatCardComponent } from './time-entries-stat-card/time-entries-stat-card.component';
import { StatCardComponent } from './stat-card/stat-card.component';
import { MatListModule } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'ezc-dashboard-main',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    ProgressCircleComponent,
    NgOptimizedImage,
    TimeEntriesStatCardComponent,
    StatCardComponent,
    MatListModule,
    MatDivider
  ],
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMainComponent {
  private id = inject(ActivatedRoute).snapshot.paramMap.get('id')!;
  private cosplanService = inject(CosplanService);

  cosplan = toSignal(this.cosplanService.getCosplanbyId$(+this.id));
}
