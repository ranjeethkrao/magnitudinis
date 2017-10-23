import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '',
      component: AdminLayoutComponent,
      children: [
          {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    }, {
        path: 'feed',
        loadChildren: './feed/feed.module#FeedModule'
    }]
    },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: '',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    }
];
