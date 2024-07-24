import { Route } from '@angular/router';
import { CosplanListComponent } from './components/cosplan-list/cosplan-list.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CosplanDashboardLayoutComponent } from './components/layout/dasboard-layout/cosplan-dashboard-layout.component';
import { DashboardMainComponent } from './components/dashboard/main/dashboard-main.component';
import { CosplanService } from './services/cosplan.service';
import { cosplanViewGuard } from './guards/cosplan-view.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        title: 'Mes cosplans',
        component: CosplanListComponent,
      },
    ],
  },
  {
    path: 'dashboard/:id',
    component: CosplanDashboardLayoutComponent,
    providers: [CosplanService],
    canActivate: [cosplanViewGuard],
    children: [
      {
        path: '',
        title: 'Dashboard',
        component: DashboardMainComponent,
      },
    ],
  },
];
