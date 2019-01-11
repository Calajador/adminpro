import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'}},
      {path: 'progress', component: ProgressComponent, data: { titulo: 'Dashboard'}},
      {path: 'graficas1', component: Graficas1Component, data: { titulo: 'Dashboard'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Dashboard'}},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]

  }
];

export const pages_router = RouterModule.forChild(pagesRoutes);
