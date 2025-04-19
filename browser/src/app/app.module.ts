import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaxisComponent } from './taxis/taxis.component';
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
import { DashboardComponent } from './dashboard/dashboard.component';
import { MotoristasComponent } from './motoristas/motoristas.component';
import { MotoristaDetailComponent } from './motorista-detail/motorista-detail.component';

import { MotoristaService } from './motorista.service';
import { MotoristaCreateComponent } from './motorista-create/motorista-create.component';
import { ConfigsComponent } from './configs/configs.component'

@NgModule({
  declarations: [
    AppComponent,
    TaxisComponent,
    LoginComponent,
    DashboardComponent,
    MotoristasComponent,
    MotoristaDetailComponent,
    MotoristaCreateComponent,
    ConfigsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
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
    MatCardModule
  ],
  providers: [MotoristaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
