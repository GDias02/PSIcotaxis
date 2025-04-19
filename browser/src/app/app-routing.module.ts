import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MotoristasComponent } from './motoristas/motoristas.component';
import { MotoristaDetailComponent } from './motorista-detail/motorista-detail.component';
import { MotoristaCreateComponent } from './motorista-create/motorista-create.component';
import { TaxisComponent } from './taxis/taxis.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'motoristas', component: MotoristasComponent },
  { path: 'taxis', component: TaxisComponent },
  { path: 'motoristas/:id', component: MotoristaDetailComponent },
  { path: 'motoristas/create', component: MotoristaCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }