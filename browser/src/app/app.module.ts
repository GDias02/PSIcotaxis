import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TaxisComponent } from './main-page/taxis/taxis.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardComponent } from './main-page/dashboard/dashboard.component';
import { MotoristasComponent } from './main-page/motoristas/motoristas.component';
import { MotoristaDetailComponent } from './main-page/motorista-detail/motorista-detail.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { MotoristaService } from './main-page/motorista.service';
import { MotoristaCreateComponent } from './main-page/motorista-create/motorista-create.component';
import { ConfigsComponent } from './main-page/configs/configs.component'
import { MoradaCreateComponent } from './main-page/morada-create/morada-create.component';
import { ViagensComponent } from './main-page/viagens/viagens.component';
import { ViagemCustoComponent } from './main-page/viagem-custo/viagem-custo.component'
import { MainPageModule } from './main-page/main-page.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MainPageModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
    MatSelectModule,
    MatOptionModule,
  ],
  providers: [MotoristaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
