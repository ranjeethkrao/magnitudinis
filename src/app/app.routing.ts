import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { UsersComponent } from './users/users.component';

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
        path: 'users',
        loadChildren: './users/users.module#UsersModule'
      }, {
        path: 'feed',
        loadChildren: './feed/feed.module#FeedModule'
      }, {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      }
  ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: '',
      loadChildren: './pages/pages.module#PagesModule'
    }]
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'

  }];
