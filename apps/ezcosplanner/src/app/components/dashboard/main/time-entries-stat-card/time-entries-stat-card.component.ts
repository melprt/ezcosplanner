import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCard,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ezc-time-entries-stat-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatIcon,
  ],
  templateUrl: './time-entries-stat-card.component.html',
  styleUrl: './time-entries-stat-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeEntriesStatCardComponent {
  @Input({required: true}) title!: string;
  @Input({required: true}) subtitle!: string;
}
