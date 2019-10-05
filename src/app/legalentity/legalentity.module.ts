import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalentityRoutingModule } from './legalentity-routing.module';
import { LegalentityLoginComponent } from './legalentity-login/legalentity-login.component';
import { FormsModule, ReactiveFormsModule, NgForm, NgModel } from '@angular/forms';
import { LegalentityLogin } from './model/legalentity-login';
import { LegalentityMainComponent } from './legalentity-main/legalentity-main.component';
import { LegalentityDashboardComponent } from './legalentity-dashboard/legalentity-dashboard.component';
import { OrderModule } from 'ngx-order-pipe';
import { LegalentityEquipmentComponent } from './legalentity-equipment/legalentity-equipment.component';
import { LegalentityBranch } from './model/legalentity-branch';
import { LegalentityEquipment } from './model/legalentity-equipment';
import { LegalentityEquipmentName } from './model/legalentity-equipment-name';
import { LegalentityEquipmentModel } from './model/legalentity-equipment-model';
import { LegalentityEquipmentManuf } from './model/legalentity-equipment-manuf';
import { LegalentityEquipmentServiceProvider } from './model/legalentity-equipment-service-provider';
import { LegalentityEquipmentOwner } from './model/legalentity-equipment-owner';
import { LegalentityEquipmentOwnerContact } from './model/legalentity-equipment-owner-contact';
import { LegalentityHeadofficeComponent } from './legalentity-headoffice/legalentity-headoffice.component';
import { CountryCallingCode } from '../model/country-calling-code';
import {NgPipesModule} from 'ngx-pipes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { LegalentityQrusage } from './model/legalentity-qrusage';
import { LegalentityDashboardService } from './services/legalentity-dashboard.service';
import { LegalentityBranchComponent } from './legalentity-branch/legalentity-branch.component';
import { LegalentityBranchRulebook } from './model/legalentity-branch-rulebook';
import { LegalentityAddBranch } from './model/legalentity-add-branch';
import { LegalentityResetPasswordComponent } from './legalentity-reset-password/legalentity-reset-password.component';
import { ToastrModule } from 'ngx-toastr';
import { LegalentityEquptNewComponent } from './legalentity-equpt-new/legalentity-equpt-new.component';
import {MatCheckboxModule, MatProgressSpinnerModule, MatInputModule} from '@angular/material';
import { LegalentityAddTechnicianNewComponent } from './legalentity-add-technician-new/legalentity-add-technician-new.component';
import { LegalentityComplaintsReportComponent } from './legalentity-complaints-report/legalentity-complaints-report.component';
import { LegalentityFreshComplaintRptComponent } from './legalentity-fresh-complaint-rpt/legalentity-fresh-complaint-rpt.component';
import { LegalentityComplaintsService } from './services/legalentity-complaints.service';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogContainer} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LegalentityBranchRptComponent } from './legalentity-reports/legalentity-branch-rpt/legalentity-branch-rpt.component';
import { LegalentityAllotQrComponent } from './legalentity-allot-qr/legalentity-allot-qr.component';
import { LegalentityOpenComplaintRptComponent } from './legalentity-rpt/legalentity-open-complaint-rpt/legalentity-open-complaint-rpt.component';
import { LegalentityAssignTechnicianComponent } from './legalentity-assign-technician/legalentity-assign-technician.component';
import { LegalentityConfirmAlertComponent } from './legalentity-confirm-alert/legalentity-confirm-alert.component';
import { LegalentityTechnicianService } from './services/legalentity-technician.service';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import { LegalentityIndivComplaintRptComponent } from './legalentity-rpt/legalentity-indiv-complaint-rpt/legalentity-indiv-complaint-rpt.component';
import { LegalentityLeadtimeCompRptComponent } from './legalentity-rpt/legalentity-leadtime-comp-rpt/legalentity-leadtime-comp-rpt.component';
import { LegalentityAssingedComplaintRptComponent } from './legalentity-rpt/legalentity-assinged-complaint-rpt/legalentity-assinged-complaint-rpt.component';





@NgModule({
  imports: [
    CommonModule,
    LegalentityRoutingModule,
    FormsModule,
    OrderModule,
    NgPipesModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSortModule
  ],
  declarations: [
    LegalentityLoginComponent, 
    LegalentityMainComponent, 
    LegalentityDashboardComponent, 
    LegalentityEquipmentComponent, 
    LegalentityHeadofficeComponent, 
    LegalentityBranchComponent, 
    LegalentityResetPasswordComponent, 
    LegalentityEquptNewComponent,
    LegalentityAddTechnicianNewComponent, LegalentityComplaintsReportComponent, LegalentityFreshComplaintRptComponent, LegalentityBranchRptComponent, LegalentityAllotQrComponent, LegalentityOpenComplaintRptComponent, LegalentityAssignTechnicianComponent, LegalentityConfirmAlertComponent, LegalentityIndivComplaintRptComponent, LegalentityLeadtimeCompRptComponent, LegalentityAssingedComplaintRptComponent ],
  providers:[
    LegalentityLogin,
    LegalentityBranch,
    LegalentityEquipment,
    LegalentityEquipmentName,
    LegalentityEquipmentModel,
    LegalentityEquipmentManuf,
    LegalentityEquipmentServiceProvider,
    LegalentityEquipmentOwner,
    LegalentityEquipmentOwnerContact,
    CountryCallingCode,
    LegalentityQrusage,
    LegalentityDashboardService,
    LegalentityBranchRulebook,
    LegalentityAddBranch,
    LegalentityComplaintsService,
    LegalentityTechnicianService
  ],
  entryComponents:[
    LegalentityAssignTechnicianComponent,
    LegalentityConfirmAlertComponent,
    LegalentityIndivComplaintRptComponent
  ]
})
export class LegalentityModule { }
