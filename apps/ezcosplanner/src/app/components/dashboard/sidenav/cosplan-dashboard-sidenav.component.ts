import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { NgTemplateOutlet } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ezc-cosplan-dashboard-sidenav',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIcon,
    NgTemplateOutlet,
    RouterModule
  ],
  templateUrl: './cosplan-dashboard-sidenav.component.html',
  styleUrl: './cosplan-dashboard-sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosplanDashboardSidenavComponent {}
