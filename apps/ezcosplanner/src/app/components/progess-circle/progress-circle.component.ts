import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ezc-progress-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-circle.component.html',
  styleUrl: './progress-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircleComponent {
  @Input({required: true}) progress!: number;
  @Input({required: true}) label!: string;
  @Input({required: true}) content!: string;
  @Input({required: false}) additionalContent!: string;
}
