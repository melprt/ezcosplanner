import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'ezc-app-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage,
    MatDivider
  ],
  templateUrl: './app-top-bar.component.html',
  styleUrl: './app-top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTopBarComponent {}
