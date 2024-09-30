import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'ezc-wip-picture-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatIconModule, MatIconButton],
  templateUrl: './wip-picture-card.component.html',
  styleUrl: './wip-picture-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WipPictureCardComponent {
  expandedPicture = signal<boolean>(false);

  togglePictureFullSize () : void {
    this.expandedPicture.update(val => !val);
  }
}
