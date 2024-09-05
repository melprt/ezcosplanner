import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Cosplan } from '../../../models/cosplan';

@Component({
  selector: 'ezc-dashboard-title',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './dashboard-title.component.html',
  styleUrl: './dashboard-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTitleComponent {
  @Input({ required: true }) cosplan!: Cosplan;
  @Input({ required: true }) subtitle!: string;
}
