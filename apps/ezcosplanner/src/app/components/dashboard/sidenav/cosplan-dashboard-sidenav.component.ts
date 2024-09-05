import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { NgTemplateOutlet } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CosplanService } from '../../../services/cosplan.service';

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
    RouterModule,
    MatTooltipModule
  ],
  templateUrl: './cosplan-dashboard-sidenav.component.html',
  styleUrl: './cosplan-dashboard-sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosplanDashboardSidenavComponent {
  protected cosplan = inject(CosplanService).cosplan;
}
