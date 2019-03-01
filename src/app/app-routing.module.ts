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
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { TrabajadorComponent } from './pages/personal/trabajador.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent, data: { titulo: 'DashBoard'}},
      {path: 'progress', component: ProgressComponent, data: { titulo: 'Progres'}},
      {path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'}},
      {path: 'promesas', component: PromesasComponent, data: { titulo: 'Contactos'}},
      {path: 'rxjs', component: RxjsComponent, data: { titulo: 'Pacientes'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema'}},
      {path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de Usuario'}},
      {path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador'}},
      // Mantenimiento
      {path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios'}},
      {path: 'departamentos', component: DepartamentosComponent, data: { titulo: 'Mantenimiento de Departamentos'}},
      {path: 'personal', component: PersonalComponent, data: { titulo: 'Mantenimiento de Personal'}},
      {path: 'trabajador/:id', component: TrabajadorComponent, data: { titulo: 'Actualizar trabajador'}},
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
