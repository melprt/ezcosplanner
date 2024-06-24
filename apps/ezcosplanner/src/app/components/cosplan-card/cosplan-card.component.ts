import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ezc-cosplan-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cosplan-card.component.html',
  styleUrl: './cosplan-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosplanCardComponent {}
