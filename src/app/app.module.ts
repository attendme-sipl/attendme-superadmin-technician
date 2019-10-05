import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperadminModule } from './superadmin/superadmin.module';
import { UtilServicesService } from './util-services.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';


import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { SALoginModel } from './superadmin/superadmin-login/salogin-model';
import { DatePipe, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LegalentityModule } from './legalentity/legalentity.module';
import {NgPipesModule} from 'ngx-pipes'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr'
import { LegalentityMaster } from './model/legalentity-master';
import { SuperadminQridGenerateService } from './superadmin/services/superadmin-qrid-generate.service';
import { TechnicianModule } from './technician/technician.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SuperadminModule,
    FormsModule,
    HttpClientModule,
    LegalentityModule,
    TechnicianModule,
    NgPipesModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton:true
    })
  ],
  providers: [Title,
    UtilServicesService,
    SALoginModel,
    DatePipe,
    LegalentityMaster,
    {provide:LocationStrategy, useClass: HashLocationStrategy}, 
    SuperadminQridGenerateService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
