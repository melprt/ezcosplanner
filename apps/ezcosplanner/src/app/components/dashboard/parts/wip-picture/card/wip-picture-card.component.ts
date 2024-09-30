import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'ezc-wip-picture-card',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatIconModule,
    MatIconButton,
    MatIcon,
    MatButtonModule,
  ],
  templateUrl: './wip-picture-card.component.html',
  styleUrl: './wip-picture-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WipPictureCardComponent {
  expandedPicture = signal<boolean>(false);

  togglePictureFullSize(): void {
    this.expandedPicture.update((val) => !val);
  }
}
