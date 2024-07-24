import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CosplanDashboardTopBarComponent } from '../../dashboard/top-bar/cosplan-dashboard-top-bar.component';
import { CosplanDashboardSidenavComponent } from '../../dashboard/sidenav/cosplan-dashboard-sidenav.component';

@Component({
  selector: 'ezc-cosplan-dashboard-layout',
  standalone: true,
  imports: [RouterModule, CosplanDashboardTopBarComponent, CosplanDashboardSidenavComponent],
  templateUrl: './cosplan-dashboard-layout.component.html',
  styleUrl: './cosplan-dashboard-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosplanDashboardLayoutComponent {
}
