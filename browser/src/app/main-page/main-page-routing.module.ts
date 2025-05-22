import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViagensComponent } from './viagens/viagens.component';
import { ConfigsComponent } from './configs/configs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MotoristaCreateComponent } from './motorista-create/motorista-create.component';
import { MotoristaDetailComponent } from './motorista-detail/motorista-detail.component';
import { MotoristasComponent } from './motoristas/motoristas.component';
import { TaxisComponent } from './taxis/taxis.component';
import { ViagemCustoComponent } from './viagem-custo/viagem-custo.component';
import { MainPageComponent } from './main-page.component';
import { TaxiCreateComponent } from './taxi-create/taxi-create.component';
import { TaxiDetailComponent } from './taxi-detail/taxi-detail.component';
import { PedidoCreateComponent } from './pedido-create/pedido-create.component';
import { AppComponent } from '../app.component';
import { TurnoCreateComponent } from './turno-create/turno-create.component';
import { MotoristaViagemComponent } from './motorista-viagem/motorista-viagem.component';
import { userResolver } from './user-resolver';
import { MotoristaViagensComponent } from './motorista-viagens/motorista-viagens.component';
import { TurnosComponent } from './turnos/turnos.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { EstatisticasTotaisComponent } from './estatisticas-totais/estatisticas-totais.component';
import { EstatisticasSubtotaisComponent } from './estatisticas-subtotais/estatisticas-subtotais.component';
import { EstatisticasDetailsComponent } from './estatisticas-details/estatisticas-details.component';
import { MotoristaUpdateComponent } from './motorista-update/motorista-update.component';
import { TaxiUpdateComponent } from './taxi-update/taxi-update.component';
import { ViagemDetailComponent } from './viagem-detail/viagem-detail.component';

const mainroutes: Routes = [
    { path: 'main-page', component: MainPageComponent, resolve: {user: userResolver}, children: [
      { path: 'viagens', component: ViagensComponent, resolve: {user: userResolver} },
      { path: 'motoristas', component: MotoristasComponent },
      { path: 'motoristas/create', component: MotoristaCreateComponent },
      { path: 'motoristas/update/:id', component: MotoristaUpdateComponent},
      { path: 'motoristas/pedidos', component: PedidosComponent, resolve: {user: userResolver} },
      { path: 'motoristas/:id', component: MotoristaDetailComponent, resolve: {user: userResolver} },
      { path: 'taxis', component: TaxisComponent },
      { path: 'taxis/create', component: TaxiCreateComponent },
      { path: 'taxis/update/:id', component: TaxiUpdateComponent },
      { path: 'taxis/:id', component: TaxiDetailComponent },
      { path: 'turnos/create', component: TurnoCreateComponent, resolve: {user: userResolver} },
      { path: 'turnos/:id/viagem', component: MotoristaViagemComponent, resolve: {user: userResolver} },
      { path: 'turnos', component: TurnosComponent, resolve: {user: userResolver} },
      { path: 'motorista/viagens', component: MotoristaViagensComponent, resolve: {user: userResolver} },
      { path: 'configs', component: ConfigsComponent },
      { path: 'viagens/custo', component: ViagemCustoComponent },
      { path: 'viagens/:id', component: ViagemDetailComponent },
      { path: 'pedidos', component: PedidoCreateComponent},
      { path: 'estatisticas/details', component: EstatisticasDetailsComponent },
      { path: 'estatisticas/subtotal', component: EstatisticasSubtotaisComponent },
      { path: 'estatisticas/total', component: EstatisticasTotaisComponent }
    ]},
    { path: '**', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forChild(mainroutes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
