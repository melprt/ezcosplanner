import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { CosplanService } from '../../../services/cosplan.service';


@Component({
  selector: 'ezc-cosplan-dashboard-top-bar',
  standalone: true,
  imports: [CommonModule, MatToolbar, MatIcon],
  templateUrl: './cosplan-dashboard-top-bar.component.html',
  styleUrl: './cosplan-dashboard-top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosplanDashboardTopBarComponent {
  protected cosplan = inject(CosplanService).cosplan;
  protected viewMode = inject(CosplanService).viewMode;
  protected cosplanStatus = computed(() => this.cosplan()?.status);
}
