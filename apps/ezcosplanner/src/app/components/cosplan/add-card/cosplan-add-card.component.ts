import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ezc-cosplan-add-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, RouterLink],
  templateUrl: './cosplan-add-card.component.html',
  styleUrl: './cosplan-add-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosplanAddCardComponent {}
