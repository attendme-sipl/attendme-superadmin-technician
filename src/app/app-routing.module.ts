import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperadminLoginComponent } from './superadmin/superadmin-login/superadmin-login.component';import { SuperadminMainComponent } from './superadmin/superadmin-main/superadmin-main.component';
import { AddLegalEntityComponent } from './superadmin/add-legal-entity/add-legal-entity.component';
import { DashboardComponent } from './superadmin/dashboard/dashboard.component';
import { SuperadminGenerateQRComponent } from './superadmin/superadmin-generate-qr/superadmin-generate-qr.component';

 /*const routes: Routes = [
  {path:"superadmin",children:[
    {path:"login",component:SuperadminLoginComponent},
    {path:"portal",component: SuperadminMainComponent, children:[
      {path:"dashboard",component:DashboardComponent},
      {path:"addlegalentity",component:AddLegalEntityComponent},
      {path:"generateQRId",component:SuperadminGenerateQRComponent}
    ]},
    {path:'',redirectTo:"login",pathMatch:"full"}
  ]},
  {path:'',redirectTo:"superadmin/login",pathMatch:"full"}
 ];*/

const routes: Routes = [
 
  {path:'',redirectTo:"technician",pathMatch:"full"},
  {path:'*', redirectTo:"technician", pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
