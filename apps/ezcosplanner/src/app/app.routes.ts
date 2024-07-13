import { Route } from '@angular/router';
import { CosplanListComponent } from './components/cosplan-list/cosplan-list.component';
import { LayoutComponent } from './components/layout/layout.component';

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
];
