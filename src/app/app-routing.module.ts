import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './login/register.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { PagesComponent } from './pages/pages.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { PromesasComponent } from './pages/promesas/promesas.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent, data: { titulo: 'DashBoard'}},
      {path: 'progress', component: ProgressComponent, data: { titulo: 'Progres'}},
      {path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'}},
      {path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}},
      {path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema'}},
      {path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de Usuario'}},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NopagefoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
