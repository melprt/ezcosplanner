import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from '../app-top-bar/app-top-bar.component';

@Component({
  standalone: true,
  imports: [RouterModule, AppTopBarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
