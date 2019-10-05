import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadminLoginComponent } from './superadmin-login/superadmin-login.component';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { SALoginModel } from './superadmin-login/salogin-model';
import { HttpHeaders } from '@angular/common/http';
import { SuperadminMainComponent } from './superadmin-main/superadmin-main.component';
import { AddLegalEntityComponent } from './add-legal-entity/add-legal-entity.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LegalEntity } from './model/legal-entity';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgbModule, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap'
import {AngularFontAwesomeModule} from 'angular-font-awesome'
import { pipe } from '@angular/core/src/render3/pipe';
import {OrderModule} from 'ngx-order-pipe';
import { SuperadminGenerateQRComponent } from './superadmin-generate-qr/superadmin-generate-qr.component'


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFontAwesomeModule,
    OrderModule
    ],
  declarations: [SuperadminLoginComponent, SuperadminMainComponent, AddLegalEntityComponent, DashboardComponent, SuperadminGenerateQRComponent],
  exports: [SuperadminLoginComponent],
  providers:[LegalEntity, NgbDatepicker]
})
export class SuperadminModule {

  constructor(){}

  

 }
