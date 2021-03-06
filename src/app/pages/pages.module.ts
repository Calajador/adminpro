import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




// ng2-charts
import { ChartsModule } from 'ng2-charts';

// modulos
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';



import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';


import { pages_router } from './pages.routes';


import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficaDonutComponent } from '../components/grafica-donut/grafica-donut.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { PersonalComponent } from './personal/personal.component';
import { TrabajadorComponent } from './personal/trabajador.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficaDonutComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    ModalUploadComponent,
    DepartamentosComponent,
    PersonalComponent,
    TrabajadorComponent,
    BusquedaComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    pages_router,
    FormsModule,
    ChartsModule,
    PipesModule

  ]
})

export class PagesModule {}
