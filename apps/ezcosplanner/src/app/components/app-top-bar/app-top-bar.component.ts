import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'ezc-app-top-bar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app-top-bar.component.html',
  styleUrl: './app-top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTopBarComponent {}
