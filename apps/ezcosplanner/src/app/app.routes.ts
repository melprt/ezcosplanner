import { Route } from '@angular/router';
import { CosplanListComponent } from './components/cosplan/list/cosplan-list.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CosplanDashboardLayoutComponent } from './components/layout/dasboard-layout/cosplan-dashboard-layout.component';
import { DashboardMainComponent } from './components/dashboard/main/dashboard-main.component';
import { CosplanPartListComponent } from './components/dashboard/parts/cosplan-part-list.component';
import { CosplanService } from './services/cosplan.service';
import { cosplanViewGuard } from './guards/cosplan-view.guard';
import { FileApiService } from './services/file-api.service';
import { CosplanPartComponent } from './components/dashboard/parts/edit/cosplan-part.component';
import { PartApiService } from './services/part-api.service';
import { CosplanTimeEntryListComponent } from './components/dashboard/time-entries/cosplan-time-entry-list.component';
import { TimeEntryApiService } from './services/time-entry-api.service';

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
  { path: 'dashboard', pathMatch: 'full', redirectTo: 'dashboard/' },
  {
    path: 'dashboard/:id',
    component: CosplanDashboardLayoutComponent,
    providers: [CosplanService, PartApiService, TimeEntryApiService],
    canActivate: [cosplanViewGuard],
    children: [
      {
        path: '',
        title: 'Dashboard',
        component: DashboardMainComponent,
        providers: [FileApiService],
        pathMatch: 'full',
      },
      {
        path: 'part',
        title: 'Liste des éléments',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: CosplanPartListComponent,
          },
          {
            path: ':id',
            title: 'Part',
            component: CosplanPartComponent,
          }
        ]
      },
      {
        path: 'timeentry',
        title: 'Temps passé',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: CosplanTimeEntryListComponent,
          }
        ]
      }
    ],
  },
];
