import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components and Routers
import { MainPageRoutingModule } from './main-page-routing.module';
import { PedidoCreateComponent } from './pedido-create/pedido-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigsComponent } from './configs/configs.component';
import { MoradaCreateComponent } from './morada-create/morada-create.component';
import { MotoristaCreateComponent } from './motorista-create/motorista-create.component';
import { MotoristaDetailComponent } from './motorista-detail/motorista-detail.component';
import { MotoristasComponent } from './motoristas/motoristas.component';
import { TaxisComponent } from './taxis/taxis.component';
import { TaxiDetailComponent } from './taxi-detail/taxi-detail.component';
import { TaxiCreateComponent } from './taxi-create/taxi-create.component';
import { ViagemCustoComponent } from './viagem-custo/viagem-custo.component';
import { ViagensComponent } from './viagens/viagens.component';
import { MessagesComponent } from './messages/messages.component';
import { MainPageComponent } from './main-page.component';
import { TurnoCreateComponent } from './turno-create/turno-create.component';
import { TurnosComponent } from './turnos/turnos.component';
import { PedidoCreateFormComponent } from './pedido-create-form/pedido-create-form.component';

//Materials
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MapViewerComponent } from './map-viewer/map-viewer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DarBoleiaComponent } from './dar-boleia/dar-boleia.component';
import { MotoristaViagemComponent } from './motorista-viagem/motorista-viagem.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainPageRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    //Materials
    MatTabsModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    AsyncPipe

  ],
  declarations: [
    MainPageComponent,
    TaxisComponent,
    DashboardComponent,
    MotoristasComponent,
    MotoristaDetailComponent,
    MotoristaCreateComponent,
    ConfigsComponent,
    MoradaCreateComponent,
    ViagensComponent,
    ViagemCustoComponent,
    TaxiDetailComponent,
    TaxiCreateComponent,
    MessagesComponent,
    PedidoCreateComponent,
    PedidoCreateFormComponent,
    TurnoCreateComponent,
    TurnosComponent,
    PedidoCreateFormComponent,
    MapViewerComponent,
    DarBoleiaComponent,
    MotoristaViagemComponent,
  ],
})
export class MainPageModule {
}
