import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LegalentityLoginComponent } from './legalentity-login/legalentity-login.component';
import { LegalentityMainComponent } from './legalentity-main/legalentity-main.component';
import { LegalentityDashboardComponent } from './legalentity-dashboard/legalentity-dashboard.component';
import { LegalentityEquipmentComponent } from './legalentity-equipment/legalentity-equipment.component';
import { LegalentityHeadofficeComponent } from './legalentity-headoffice/legalentity-headoffice.component';
import { LegalentityBranch } from './model/legalentity-branch';
import { LegalentityBranchComponent } from './legalentity-branch/legalentity-branch.component';
import { LegalentityResetPasswordComponent } from './legalentity-reset-password/legalentity-reset-password.component';
import { LegalentityEquptNewComponent } from './legalentity-equpt-new/legalentity-equpt-new.component';

import { LegalentityAddTechnicianNewComponent } from './legalentity-add-technician-new/legalentity-add-technician-new.component';
import { LegalentityFreshComplaintRptComponent } from './legalentity-fresh-complaint-rpt/legalentity-fresh-complaint-rpt.component';
import { LegalentityBranchRptComponent } from './legalentity-reports/legalentity-branch-rpt/legalentity-branch-rpt.component';
import { LegalentityOpenComplaintRptComponent } from './legalentity-rpt/legalentity-open-complaint-rpt/legalentity-open-complaint-rpt.component';
import { LegalentityLeadtimeCompRptComponent } from './legalentity-rpt/legalentity-leadtime-comp-rpt/legalentity-leadtime-comp-rpt.component';
import { LegalentityAssingedComplaintRptComponent } from './legalentity-rpt/legalentity-assinged-complaint-rpt/legalentity-assinged-complaint-rpt.component';

const legalEntityRoutes: Routes = [
  {path:"legalentity",children:[
    {path:"login",component:LegalentityLoginComponent},
    {path:'',redirectTo:"login",pathMatch:"full"},
    {path:'headoffice',component:LegalentityHeadofficeComponent},
    {path:'reset-password',component:LegalentityResetPasswordComponent},
    {path:"portal",component:LegalentityMainComponent, children:[
      {path:"dashboard",component:LegalentityDashboardComponent},
      {path:"equipment/:leMenuId", component:LegalentityEquptNewComponent},
      {path:"branch/:leMenuId",component:LegalentityBranchComponent},
      {path:"technician/:leMenuId",component:LegalentityAddTechnicianNewComponent},
      {path:"complaintRpt/fresh", component:LegalentityFreshComplaintRptComponent},
      {path:"complaintRpt/open", component:LegalentityOpenComplaintRptComponent},
      {path:"complaintRpt/lead-time", component: LegalentityLeadtimeCompRptComponent},
      {path:"complaintRpt/assinged", component: LegalentityAssingedComplaintRptComponent},
      {path:"rpt/branch",component:LegalentityBranchRptComponent}
    ]}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(legalEntityRoutes)],
  exports: [RouterModule]
})
export class LegalentityRoutingModule { }
