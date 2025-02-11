import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CosplanService } from '../../../services/cosplan.service';
import { DashboardTitleComponent } from '../title/dashboard-title.component';
import { AddPartCardComponent } from './add-card/add-part-card.component';
import { PartCardComponent } from './card/part-card.component';

@Component({
  selector: 'ezc-cosplan-part-list',
  standalone: true,
  imports: [CommonModule, DashboardTitleComponent, AddPartCardComponent, PartCardComponent],
  templateUrl: './cosplan-part-list.component.html',
  styleUrl: './cosplan-part-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosplanPartListComponent {
  private cosplanService = inject(CosplanService);
  cosplan = this.cosplanService.cosplan;
}
