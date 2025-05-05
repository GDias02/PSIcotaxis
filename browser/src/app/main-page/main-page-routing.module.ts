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

const mainroutes: Routes = [
    { path: 'main-page', component: MainPageComponent, children: [
      { path: 'viagens', component: ViagensComponent },
      { path: 'motoristas', component: MotoristasComponent },
      { path: 'motoristas/create', component: MotoristaCreateComponent },
      { path: 'motoristas/:id', component: MotoristaDetailComponent },
      { path: 'taxis', component: TaxisComponent },
      { path: 'taxis/create', component: TaxiCreateComponent },
      { path: 'taxis/:id', component: TaxiDetailComponent },
      { path: 'configs', component: ConfigsComponent },
      { path: 'viagens/custo', component: ViagemCustoComponent },
      { path: 'pedidos', component: PedidoCreateComponent}
    ]},
    { path: '**', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forChild(mainroutes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
